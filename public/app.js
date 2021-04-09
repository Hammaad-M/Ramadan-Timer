let prayerTimes = [];
let rawPrayerTimes = [];
let now = new Date();
let nextPrayer;
let nextPrayerIndex;
let changingLocation = false;
let locationChanged = false;
let customCity = false;
let customCountryCode;
let citySupported;
let unix;
let first = 0;
let pauseCounter = 16;
let playAdhan = false;
let fullAdhan = false;
let adhanResizedDown = false;
let adhanResizedUp = false;
let prayerResizedUp = false;
let prayerResizedDown = false;
let myCity = null;
let alertEffect = false;
const adhan = new Audio();
const duas = ["", "iftar-dua.png"];
const prayers = ["Fajr/Sunrise", "Maghrib/Sunset"];
const countdown = document.getElementById("countdown");
const nextPrayerDisplays = document.querySelectorAll(".next-prayer");
const prayerTimeDisplay = document.getElementById("prayer-time");
const cityDisplay = document.getElementById("location");
const locationForm = document.querySelector(".location-form");
const changeLocationButton = document.getElementById("change-location");
const locationInput = document.getElementById("city-input");
const currentTime = document.getElementById("current-time");
const allPrayerTimes = document.getElementById("all-prayer-times");
document.getElementById("adhan-off").checked = true;

async function getTimes(data, useIP) {
  if (!('fetch' in window)) {
    alert("Fetch API disabled or not found...unable to get prayer times.");
    return;
  }
  let times = [];
  return new Promise(async (resolve) => {
    if (useIP) {
      await jQuery(async ($) => {
        $.getJSON('https://www.islamicfinder.us/index.php/api/prayer_times?user_ip=' + data, (response) => {
          if (response.success == false || !response) {
            errorScreen();
          } else {
            times.push(
              response.results.Fajr, 
              response.results.Dhuhr, 
              response.results.Asr, 
              response.results.Maghrib, 
              response.results.Isha
            );
            times.forEach((t, i) => {
              times[i] = t.replaceAll("%", "");
            });
            let city = response.settings.location.city;
            resolve({ times, city});
          }
        });
      })
    } else {
      await jQuery(async ($) => {
        $.getJSON('https://api.aladhan.com/v1/timingsByCity?city=' + data + '&country=' + customCountryCode, (response) => {
          if (response.status != "OK") {
            citySupported = false;
            alert("Unable to get prayer times for your city...try using a local major city instead.")
            window.location.reload();
          } else {
            citySupported = true;
            const timings = response.data.timings;
            times.push(
              timings.Fajr, 
              timings.Dhuhr,
              timings.Asr, 
              timings.Maghrib, 
              timings.Isha
            );
            resolve(times);
          }
        });
      });
    }
  });
}
async function getLocation() {
  return new Promise(async (resolve) => {
    await jQuery(async ($) => {
      $.getJSON('https://ipapi.co/json/', (data) => {
        if (!data) {
          errorScreen();
        } 
        resolve(data);
      });
    })
  })
}
function update() {
  if (!customCity) {
    now = new Date();
  } else {
    unix += 1000;
    now = new Date(unix);
  } 
  currentTime.textContent = to12hrTime(now);
  if (pauseCounter > 14) {
    if (pauseCounter == 15) {
      $('#dua').remove();
    }
    remaining = msToTime(prayerTimes[nextPrayerIndex] - now);
    if (remaining.hours == 0 && remaining.minutes == 0) {
      if (remaining.seconds == 0) {
        endCountdown();
        setNextPrayer(false);
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
async function getCustomCityData(city) {
  const response = await fetch('/customCity', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    }, 
    body: JSON.stringify({ city })
  });
  const res = await response.json();
  if (res.status == 404) {
    errorScreen();
  } else {
    return new Date(res.date + " " + to24hrTime(res.time)).getTime();
  }
  
}
async function init(city) { 
  // alert(document.body.clientWidth);
  document.querySelector(".page").style.display = "none";
  $("section.loading, h1.loading, h2.loading").fadeIn(0);
  if (city != null && city == myCity) {
    city = null;
  } 
  prayerTimes = [];
  rawPrayerTimes = [];
  nextPrayer = "";
  nextPrayerIndex = 0;
  let times;
  let location;
  if (city == null) {
    location = await getLocation();
    locationForm.style.display = "none";
    customCity = false;
    let data = await getTimes(location.ip, true);
    location = data.city;
    times = data.times;
  } else {
    location = city;
    unix = await getCustomCityData(city);
    now = new Date(unix);
    times = await getTimes(location, false);
    customCity = true;
  }
  if (myCity == null) {
    myCity = location.toLowerCase();
  }
  displayAllPrayerTimes(times);
  times = [times[0], times[3]];
  location = location.substr(0, 1).toUpperCase() + location.substring(1);
  cityDisplay.textContent = location;
  times.forEach((time) => {
    rawPrayerTimes.push(time);
    prayerTimes.push(getPrayerDate(time));
  });
  msToFajr = now - prayerTimes[0];
  if (city == null) {
    fetch('/client', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ location })
    });
  }
  setNextPrayer(true);
  $("section.loading, h1.loading, h2.loading").fadeOut(500);
  setTimeout(() => (document.querySelector(".page").style.display = "initial"), 700);
  update();
  let TID = setInterval(() => {
    if (locationChanged) {
      clearInterval( TID );
      locationChanged = false;
      init(locationInput.value.toLowerCase());
    } else {
      update();
    }
  }, 1000); 
  
}
function getPrayerDate(time) {
  let string = time;
  if (!customCity) {
    string = to24hrTime(string);
  } 
  const hours = string.substr(0, (string.length == 5) ? 2 : 1);
  const minutes = string.substr(string.length-2, 2);
  let date = new Date(now.toDateString());
  date.setHours(hours, minutes, 0);
  if (date - now < 0) {
    date.setDate(now.getDate() + 1); 
  }
  return date;
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
function charCount(str, letter) 
{
 let letter_Count = 0;
 for (let i = 0; i < str.length; i++) 
 {
    if (str.charAt(i) == letter) {
      letter_Count += 1;
    }
  }
  return letter_Count;
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
function setNextPrayer(first) {
  if (!first) {
    nextPrayerIndex += 1;
    if (nextPrayerIndex >= prayers.length) {
      nextPrayerIndex = 0;
    }
  } else {
    let closest = prayerTimes[0] - now;
    let index = 0;
    prayerTimes.forEach((time, i) => {
      let diff = time - now;
      if (diff <= closest) {
        closest = diff;
        index = i;
      }
    });
    nextPrayerIndex = index;
  }
  if (nextPrayerIndex == 0) {
    document.body.style.backgroundColor = "rgba(40, 73, 10, 0.925)";
  } else {
    document.body.style.backgroundColor = "rgba(109, 30, 30, 0.959)";
  }
  
  let nextPrayer = prayers[nextPrayerIndex];
  nextPrayerDisplays.forEach((display) => {
    display.textContent = nextPrayer;
  });
  prayerTimeDisplay.textContent = to12hrDisplayTime(rawPrayerTimes[nextPrayerIndex]);
  
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
    return hours + string.substr(2, 3) + suffix;
  } else {
    return string;
  }
}
function changeLocation() {
  changingLocation = !changingLocation;
  if (changingLocation) {
    locationForm.style.display = "block";
    $('#change-location').detach().appendTo(locationForm);
    changeLocationButton.textContent = "go";
  } else {
    if (locationInput.value.length != 0) {
      $("#button-seperator").remove();
      $('#info').append('<br id="button-seperator">');
      $('#change-location').detach().appendTo($('#info'));
      locationForm.style.display = "none";
      changeLocationButton.textContent = "Change Location";
      locationChanged = true;
    }
  }
}
function displayAllPrayerTimes(times) {
  let prayerList = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  document.getElementById("all-prayer-times").innerHTML = "";
  times.forEach((time, i) => {
    $('#all-prayer-times').append(
      `<div><p class='hover-response subtitles'>${prayerList[i]}: &#8287&#8287&#8287 <span>${to12hrDisplayTime(time)}</span></p></div>`
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
  countdown.innerHTML = "";
  pauseCounter = 0;
  if (nextPrayerIndex == 1) {
    $('.content').prepend(
      "<img id='dua' src='https://azureassets.azureedge.net/media/" + duas[nextPrayerIndex] + "' alt='Iftar dua' width='100%' height='50%'>"
    );
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

}
function createAlertEffects(s) {
  if (s % 2 == 0) {
    let color = (nextPrayerIndex == 1) ? "rgb(51,255,119)" : "rgb(255,51,51)";
    if (nextPrayerIndex == 0) {
      countdown.style.textShadow = "0 0 15px white";
    } else {
      countdown.style.textShadow = "0 0 15px " + color;
    }
    countdown.style.color = color;
  } else {
    eraseAlertEffects();
  }
}
function eraseAlertEffects() {
  countdown.style.textShadow = "0 0 10px black";
  countdown.style.color = "white";
}
function adaptUI() {
  if (document.body.clientWidth < 790 && !adhanResizedDown) {
    adhanResizedDown = true;
    adhanResizedUp = false;
    $('#adhan-options').detach().appendTo($('#mobile-options-wrapper'));
    document.getElementById("adhan-options").classList.add("resized");
  } else if (document.body.clientWidth > 790 && !adhanResizedUp) {
    adhanResizedDown = false;
    adhanResizedUp = true;
    $('#adhan-options').detach().insertBefore($('#next-prayer-wrapper'));
    document.getElementById("adhan-options").classList.remove("resized");
  }
  if (document.body.clientWidth < 1100 && !prayerResizedDown) {
    prayerResizedDown = true;
    prayerResizedUp = false;
    $('#all-prayer-times').detach().appendTo($('#mobile-options-wrapper'));
    allPrayerTimes.classList.add("resized");
  } else if (document.body.clientWidth > 1100 && !prayerResizedUp) {
    prayerResizedDown = false;
    prayerResizedUp = true;
    $('#all-prayer-times').detach().insertBefore($('.location-form'));
    allPrayerTimes.classList.remove("resized");
  }
  
}
function errorScreen() {
  countdown.innerHTML = "Unable to get data for your location.";
}