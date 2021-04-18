const adhan = new Audio();
const duas = ["", "iftar-dua.png"];
const prayers = ["Fajr", "Maghrib/Sunset"];
const countdown = document.getElementById("countdown");
const nextPrayerDisplays = document.querySelectorAll(".next-prayer");
const prayerTimeDisplay = document.getElementById("prayer-time");
const cityDisplay = document.getElementById("location");
const locationForm = document.querySelector(".location-form");
const changeLocationButton = document.getElementById("change-location");
const locationInput = document.getElementById("city-input");
const currentTime = document.getElementById("current-time");
const allPrayerTimes = document.getElementById("all-prayer-times");
const adhanOptions = document.getElementById("adhan-options");
document.getElementById("adhan-off").checked = true;
let prayerTimes = [];
let now = new Date();
let nextPrayerIndex;
let customCity = false;
let unix;
let pauseCounter = 19;
let playAdhan = false;
let fullAdhan = false;
let fajrTommorow = false;
let nextFajrTime;
const UIToggles = {
  adhanResizedDown: false, 
  adhanResizedUp: false, 
  prayerResizedUp: false, 
  prayerResizedDown: false, 
  flexedPrayerTimes: false
}
let myCity = null;
let alertEffect = false;
let err = false;
let loaded = false;
let TID;
let bgColor;
let lastMinutes;
let lastSeconds;
let backup = {
  name: "Seattle (WA) United States of America", 
  lat: 47.57000205, 
  lon: -122.339985, 
  timezone: "America/Los_Angeles", 
  city: "Seattle"
}
let lostFocus = false;
let refresh = false;
let first = true;
let lastInit;
let useIP;

async function getTimes(data) {
  if (!('fetch' in window)) {
    alert("Fetch API disabled or not found...unable to get prayer times.");
    return;
  }
  let times = [];
  return new Promise(async (resolve) => {
    if (useIP) {
      await jQuery(async ($) => {
        $.getJSON('https://www.islamicfinder.us/index.php/api/prayer_times?user_ip=' + data.ip, (response) => {
          if (response.success == false || !response) {
            err = true;
          } else {
            times = timesToArray(response);
            let city = response.settings.location.city;
            resolve({ times, city});
          }
        });
      })
    } else {
      await jQuery(async ($) => {
        $.getJSON('https://www.islamicfinder.us/index.php/api/prayer_times?latitude=' + data.lat + '&longitude=' + data.lon + '&timezone=' + data.timezone, (response) => {
          if (!response.success) {
            err = true;
          } else {
            times = timesToArray(response);
            resolve(times);
          }
        });
      });
    }
  });
}
function timesToArray(response) {
  let times = [];
  times.push(
    response.results.Fajr, 
    response.results.Dhuhr, 
    response.results.Asr, 
    response.results.Maghrib, 
    response.results.Isha
  );
  times.forEach((t, i) => {
    times[i] = t.replace("%", "").replace("%", "");
  });
  return times;
}
async function getLocation() {
  return new Promise(async (resolve) => {
    await jQuery(async ($) => {
      $.getJSON('https://ipapi.co/json/', (data) => {
        if (!data) {
          err = true;
        } else {
          resolve(data);
        }
      });
    })
  })
}
document.addEventListener('visibilitychange', () => {
  if (lostFocus && !document.hidden) {
    refresh = true;
    lostFocus = false;
  } else if (document.hidden) {
    lostFocus = true;
  }
});
function update(times) {
  let params = (customCity) ? backup : null;
  if (!customCity) {
    now = new Date();
  } else {
    unix += 1000;
    now = new Date(unix);
    if (refresh) {
      lostFocus = false;
      init(backup);
      refresh = false;
      return;
    } 
  } 
  if (now.getDate() != lastInit.getDate() && loaded) {
    init(params);
    return;
  }
  currentTime.textContent = to12hrTime(now);
  if (now.getHours() === 12 && now.getMinutes() === 0 && now.getSeconds() === 0) {
    init(params);
    return;
  }
  if (pauseCounter > 18 || nextPrayerIndex === 1) {
    if (pauseCounter == 19) {
      $('#dua').remove();
    }
    remaining = msToTime(prayerTimes[nextPrayerIndex] - now);
    if (isNaN(remaining.minutes) || isNaN(remaining.hours) || isNaN(remaining.seconds)) {
      window.location.reload(); 
    }
    if (remaining.hours == 0 && remaining.minutes == 0) {
      if (remaining.seconds == 0) {
        endCountdown();
        setNextPrayer(false, times);
      } else {
        createAlertEffects(remaining.seconds);
        updateCountdown(remaining);
      }
    } else {
      updateCountdown(remaining);
      if (alertEffect) {
        eraseAlertEffects();
      }
    }
  } else {
    pauseCounter += 1;
  }
  adaptUI();
}
function updateCountdown(remaining) {
  countdown.textContent = `${format(remaining.hours)}:${format(remaining.minutes)}:${format(remaining.seconds)}`;
}
async function getCustomCityTime(timezone) {
  const response = await fetch('/customCityTime', {
    method: 'GET',
    headers: {
      'Content-Type':'application/json',
      'timezone':timezone
    }
  });
  const res = await response.json();
  if (res.status == 404) {
    err = true;
  } else {
    return new Date(res.dateTime).getTime();
  }
  
}
function resetContent() {
  clearInterval( TID ); 
  addHoverEffect("find-me");
  addHoverEffect("geolocate-me");
  $('.dropdown').hide();
  err = false;
  prayerTimes = [];
  nextPrayerIndex = 0;
  Object.keys(UIToggles).forEach(toggle => UIToggles[toggle] = null);
}
async function init(city) {
  resetContent();
  toggleLoadingScreen();
  if (city != null && city == myCity) {
    city = null;
  } 
  let user;
  if (city === null) {
    user = await getUserData();
  } else {
    user = await setCustomLocation(city);
  }
  const location = user.location;
  const queryData = user.queryData;
  let times = user.times;  
  resetChangeLocation();
  toggleLoadingScreen();
  if (!err) { 
    await runFinalErrands(times, location, queryData, (city == null && first) ? true : false);
    update(times);
    TID = setInterval(() => {
      update(times);
    }, 1000); 
  } else {
    allPrayerTimes.style.display = "none";
    errorScreen();
    TID = setInterval(() => {
      adaptUI();
    }, 500); 
  }
}
async function runFinalErrands(times, location, queryData, newUser) {
  const asyncForEach = async () => {
    const p = [];
    times.forEach((time, i) => {
      if (i === 0 || i === 3) {
        p.push(getPrayerDate(time, queryData, i));
      }
    });
    const responses = await Promise.all(p);
    responses.forEach((res) => {
      prayerTimes.push(res.date);   
    });
    nextFajrTime = responses[0].time;
  }
  await asyncForEach();
  fajrTommorow = false;
  if (nextFajrTime.indexOf("*") != -1) {
    nextFajrTime = nextFajrTime.replace("*", "");
    fajrTommorow = true;
  }
  displayAllPrayerTimes(times);
  times = [times[0], times[3]];
  location = location.substr(0, 1).toUpperCase() + location.substring(1);
  cityDisplay.textContent = location;
  if (newUser) {
    fetch('/client', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ location })
    });
    first = false;
  }
  setNextPrayer(true, times);
  countdown.classList.remove("err-display");
  allPrayerTimes.style.display = "block";
  lastInit = new Date();
}
async function getUserData() {
  let location;
  let queryData;
  let times
  try {
    location = await getLocation();
    queryData = { ip: location.ip }
    useIP = true;
    const data = await getTimes(queryData);
    location = data.city;
    times = data.times;
    if (myCity === null) {
      myCity = location.toLowerCase();
    }
    locationForm.style.display = "none";
    customCity = false;
    now = new Date()
  } catch (err) {
    console.log(err)
    if (window.confirm("Unable to guess your location...would you like to geolocate?")) {
      geoLocate();
    } else { 
      queryData = backup;
      times = await getTimes(backup);      
      location = "Seattle";
    }
  } finally {
    return {location, queryData, times};
  }
  
}
async function setCustomLocation(city) {
  backup = city;
  useIP = false;
  unix = await getCustomCityTime(city.timezone);
  queryData = city;
  times = await getTimes(queryData);
  if (unix > 1) {
    now = new Date(unix);
  }
  customCity = true;
  return {location: city.city, times: times, queryData: queryData};
}
function geoLocate() {
  if (!navigator.geolocation) {
    alert("Geolocaton is not supported in your browser...");
  } else {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      data = await fetch('/geoData', {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'lat': lat,
          'lon': lon
        }
      });
      data = await data.json();
      customCity = true;
      init({name: data.name, timezone: data.timezone, lat: lat, lon: lon, city: data.name});
    }, (err) => {
      // alert(`ERROR(${err.code}): ${err.message}`);
      if (err.code === 1) {
        alert("You have blocked geolocation...please enter your location manually.");
      } else {
        alert("Unable to geolocate...please enter your location manually.");
      }
      init(backup)
    }, {
      enableHighAccuracy: true
    });
  }
}
async function getPrayerDate(time, data, nextPrayer) {
  let string = to24hrTime(time);
  const hours = string.substr(0, (string.length == 5) ? 2 : 1);
  const minutes = string.substr(string.length-2, 2);
  let date = new Date(now.toDateString());
  date.setHours(hours, minutes, 0);
  if (date - now < 0 && nextPrayer === 0) {
    date.setDate(now.getDate() + 1); 
    const prayer = await getNextPrayerTime(date, data, nextPrayer);
    date = prayer.date;
    time = prayer.time;
  }
  return {date, time};
}
function getNextPrayerTime(date, data) {
  let dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  let query = (useIP) ? 
    "https://www.islamicfinder.us/index.php/api/prayer_times?user_ip=" + data.ip + "&date=" + dateString
    : 'https://www.islamicfinder.us/index.php/api/prayer_times?latitude=' + data.lat + '&longitude=' 
      + data.lon + '&timezone=' + data.timezone + "&date=" + dateString;
  return new Promise(async (resolve) => {
    await jQuery(async ($) => {
      $.getJSON(query, (res) => {
        if (!res.success) {
          err = true;
          resolve(date);
        } else {
          let string = timesToArray(res)[0];
          const hours = parseInt(string.substring(0, string.indexOf(":")));
          const minutes = parseInt(string.substring(string.indexOf(":")+1, string.indexOf("m")-2));
          date.setHours(hours);
          date.setMinutes(minutes);
          resolve({date: date, time: "*" + string});
        }
      });
    })
  })
}
function to24hrTime(time) {
  let string = time;
  let objectTimeCode = time.substr(time.length-2);
  if (objectTimeCode.toLowerCase() == "pm") {
    let modifiedHours = parseInt(time.substr(0, 2))+12;
    let newTime = modifiedHours.toString() + ":" + time.substr(2);
    let check = newTime.substring(0, newTime.length-3);
    if (charCount(check, ":") >= 3) {
      check = check.replace(":", "");
    }
    return check;
  } else {
    return string.substring(0, string.length-3);
  }
}
function charCount(str, letter) {
  let letterCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) == letter) {
      letterCount += 1;
    }
  }
  return letterCount;
}
function msToTime(ms) {
  ms = Math.abs(ms);
  let seconds = ms/1000;
  let minutes = seconds/60;
  let hours = minutes/60;
  seconds = Math.trunc(seconds % 60)
  minutes = Math.trunc(minutes % 60)
  hours = Math.trunc(hours);
  if (seconds == 60) {
    minutes+=1;
    seconds = 0;
  }
  if (minutes == 60) {
    hours+=1;
    minutes = 0;
  }
  return {hours, minutes, seconds};
}
function setNextPrayer(first, times) {
  if (!first) {
    nextPrayerIndex += 1;
    if (nextPrayerIndex >= prayers.length) {
      nextPrayerIndex = 0;
    }
  } else {
    let closest = null;
    let index = 0;
    prayerTimes.forEach((time, i) => {
      let diff = time - now;
      if ((closest === null) || (diff <= closest && diff > -1)) {
        closest = diff;
        index = i;
      }
    });
    nextPrayerIndex = index;
  }
  if (nextPrayerIndex == 0) {
    bgColor = "rgba(40, 73, 10, 0.925)";
  } else {
    bgColor = "rgba(109, 30, 30, 0.959)";
  }
  document.body.style.backgroundColor = bgColor;
  nextPrayerDisplays.forEach((display) => {
    let prefix = (nextPrayerIndex == 0 && fajrTommorow) ? "Next " : "";
    display.textContent = prefix + prayers[nextPrayerIndex];
  });
  let time = (fajrTommorow) ? nextFajrTime : times[nextPrayerIndex];
  prayerTimeDisplay.textContent = to12hrDisplayTime(time).toUpperCase();
}
function format(string) {
  if (string < 10) {
    return "0" + string;
  } else {
    return string;
  }
}
function to12hrTime(date) {
  const newHours = ((date.getHours() + 11) % 12 + 1);
  const suffix = date.getHours() >= 12 ? "PM":"AM"; 
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  return newHours + ':' + minutes.substr(minutes.length-2, 2) + ':' + seconds.substr(seconds.length-2, 2) + " " + suffix;
}
function to12hrDisplayTime(string) {
  if (string.indexOf("m") < 0) {
    let hours = parseInt(string.substr(0, 2));
    let suffix = " am";
    if (hours > 12) {
      hours -= 12;
      suffix = " pm";
    }
    const colon = string.indexOf(":");
    return hours + string.substring(colon, colon + 3) + suffix;
  } else {
    return string;
  }
}
function changeLocation() {
  locationForm.style.display = "block";
  $('#change-location').detach().appendTo(locationForm);
  $('#choose-location').detach().appendTo(locationForm);
  changeLocationButton.textContent = "search";
  changeLocationButton.onclick = searchForLocation;
  $('.dropdown').show();
  $('#options-wrapper').show();
}
async function searchForLocation() {
  const city = locationInput.value;
  if (city.length > 0) {
    $('#options-wrapper').empty();
    let response = await fetch('/searchForCity', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'City':city
      }, 
    });
    response = await response.json();
    if (response.status === 200) {
      response.data.forEach((location, i) => {
        $('#options-wrapper').append(
          `<button id="${i}" onclick='init({
            name: "${location.name}", lat: ${location.lat}, lon: ${location.lon}, timezone: "${location.timezone}", city: "${location.city}"
          })' class="drop-down-buttons subtitles">${location.name}</button>`
        );
        addHoverEffect(i)
      });
    } else {
      $('#options-wrapper').css({"background-color":"white", "color":"black"});
      $('#options-wrapper').append(
        `<p class="subtitles">No Match Found</p>`
      );
    }
    $('#options-wrapper').append(
      `<button id="find-me" onclick='init(null)' style="text-decoration: underline" class="drop-down-buttons subtitles">Guess my Location</button>
      <button id="geolocate-me" onclick='geoLocate()' style="text-decoration: underline" class="drop-down-buttons subtitles">Geolocate Me</button>`
    );
    $('.dropdown').show();
  }
}
function addHoverEffect(i) {
  $(document).on('mouseenter','#' + i, () => {
    $('#' + i).css({
      "background-color":bgColor,
      "color": "white"
    });
  }).on('mouseleave','#' + i,  () => {
    $('#' + i).css({
      "background-color":"white",
      "color":"black"
    });
  });
}
function resetChangeLocation() {
  $('.dropdown').hide();
  $('#options-wrapper').hide();
  $('#change-location').detach().insertBefore($('.location-form'));
  locationForm.style.display = "none";
  changeLocationButton.textContent = "Change Location";
  changeLocationButton.onclick = changeLocation;
}
function displayAllPrayerTimes(times) {
  let prayerList = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  document.getElementById("all-prayer-times").innerHTML = "";
  times.forEach((time, i) => {
    $('#all-prayer-times').append(
      `<div><p>${prayerList[i]}: &#8287&#8287&#8287 <span>${to12hrDisplayTime(time)}</span></p></div>`
    );
  });
}
function changeAdhanMode(mode) {
  // Little audio workaround for those safari users
  adhan.play();
  adhan.pause();
  adhan.currentTime = 0;
  if (mode == "full") {
    playAdhan = true;
    fullAdhan = true;
  } else if (mode == "short") {
    playAdhan = true;
    fullAdhan = false;
  } else {
    playAdhan = false;    
  }
}
async function endCountdown() {
  pauseCounter = 0;
  if (nextPrayerIndex == 1) {
    countdown.innerHTML = "";
    $('.content').prepend(
      "<img id='dua' src='https://azureassets.azureedge.net/media/" + duas[nextPrayerIndex] + "' alt='Iftar dua' width='100%' height='50%'>"
    );
  } else {
    countdown.innerHTML = "00:00:00";
    createAlertEffects(0);
  }
  $('.options').css({
    "margin-bottom":$(".options").height() / 2
  });
  if (playAdhan) {
    adhan.src = ((fullAdhan) ? "https://azureassets.azureedge.net/media/Adhan-Egypt.mp3" : "https://azureassets.azureedge.net/media/Abdul-Basit-trimmed.mp3");
    adhan.type = 'audio/wav';
    try {
      await adhan.play();
    } catch (err) {
      console.log(err);
    }
  }
  eraseAlertEffects(0);
}
function createAlertEffects(s) {
  if (s % 2 == 0) {
    let color = (nextPrayerIndex == 1) ? "rgb(51,255,119)" : "rgb(255,51,51)";
    if (nextPrayerIndex == 0) {
      countdown.style.textShadow = "0 0 15px rgb(204, 45, 85)";
    } else {
      countdown.style.textShadow = "0 0 15px " + color;
    }
    countdown.style.color = color;
  } else {
    eraseAlertEffects();
  }
}
function eraseAlertEffects() {
  countdown.style.textShadow = "initial";
  countdown.style.color = "white";
}
function adaptUI() {
  const screenWidth = document.body.clientWidth;
  if (screenWidth < 1200) {
    if (!UIToggles.prayerResizedDown) {
      UIToggles.prayerResizedDown = true;
      UIToggles.prayerResizedUp = false;
      $('#all-prayer-times').detach().appendTo($('#mobile-options-wrapper'));
      allPrayerTimes.classList.add("resized");
    }
    if (screenWidth >= 900 && !UIToggles.flexedPrayerTimes) {
      flexPrayerTimes(true);
      UIToggles.flexedPrayerTimes = true;
    } else if (screenWidth < 900 && UIToggles.flexedPrayerTimes) {
      flexPrayerTimes(false);
      UIToggles.flexedPrayerTimes = false;
    }
  } else if (screenWidth >= 1000 && !UIToggles.prayerResizedUp) {
    UIToggles.prayerResizedDown = false;
    UIToggles.prayerResizedUp = true;
    UIToggles.flexedPrayerTimes = false;
    $('#all-prayer-times').detach().insertBefore($('.location-form'));
    allPrayerTimes.classList.remove("resized");
    flexPrayerTimes(false);
  }

  if (screenWidth < 790 && !UIToggles.adhanResizedDown) {
    UIToggles.adhanResizedDown = true;
    UIToggles.adhanResizedUp = false;
    $('#adhan-options').detach().appendTo($('#mobile-options-wrapper'));
    adhanOptions.classList.add("resized");
  } else if (screenWidth >= 790 && !UIToggles.adhanResizedUp) {
    UIToggles.adhanResizedDown = false;
    UIToggles.adhanResizedUp = true;
    $('#adhan-options').detach().insertBefore($('#next-prayer-wrapper'));
    adhanOptions.classList.remove("resized");
  }

}
function flexPrayerTimes(flex) {
  if (flex) {
    $('#all-prayer-times').css({
      "display":"flex",
      "flex-direction":"row"
    });
    $('#all-prayer-times').children().css("margin-right", "5px");
  } else {
    $('#all-prayer-times').css({
      "display":"block",
    });
    $('#all-prayer-times').children().css("margin-right", "0");
  }
}
function toggleLoadingScreen() {
  if (!loaded) {
    document.querySelector(".page").style.display = "none";
    $("section.loading, h1.loading, h2.loading").fadeIn(0);
  } else {
    $("section.loading, h1.loading, h2.loading").fadeOut(500);
    setTimeout(() => (document.querySelector(".page").style.display = "initial"), 700);
  }
  loaded = !loaded;
}
function errorScreen() {
  toggleLoadingScreen();
  currentTime.textContent = "--";
  countdown.classList.add("err-display");
  countdown.innerHTML = "We encountered an error. Please try again later.";
}
$(document).mouseup((e) => {
    const container = $(".dropdown");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      container.hide();
    }
});
