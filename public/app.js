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
let resizedDown = false;
let resizedUp = false;
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
            alert("City not supported.")
            init(null);
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
            console.log(times);
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
          alert("Unable to get location. Defaulting to Bellevue.");
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
    unix += 1;
    now = new Date(unix * 1000);
  } 
  currentTime.textContent = to12hrTime(now);
  if (pauseCounter > 14) {
    if (pauseCounter == 15) {
      $('#dua').remove();
    }
    remaining = msToTime(prayerTimes[nextPrayerIndex] - now);
    
    if (remaining.seconds == 0 && remaining.minutes == 0 && remaining.hours == 0) {
      endCountdown();
      setNextPrayer(false);
    } else {
      countdown.textContent = `${format(remaining.hours)}:${format(remaining.minutes)}:${format(remaining.seconds)}`;
    }
  } else {
    pauseCounter += 1;
  }
  adaptUI();
}
async function getCustomCityData(city) {
  console.log("1");
  const response = await fetch('/customCity', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    }, 
    body: JSON.stringify({ city })
  });
  const res = await response.json();
  if (res.status == 404) {
    alert("Unable to get current time for your city...try entering a local major city instead.");
    return null;
  } else {
    customCountryCode = res.countryCode;
    return new Date(res.formattedTime).getTime() / 1000;
  }
  
}
async function init(city) { 
  prayerTimes = [];
  rawPrayerTimes = [];
  nextPrayer = "";
  let times;
  let location;
  console.log(city);
  if (city == null) {
    location = await getLocation();
    locationForm.style.display = "none";
    customCity = false;
    let data = await getTimes(location.ip, true);
    location = data.city;
    times = data.times;
  } else {
    location = city;
    console.log(location);
    unix = await getCustomCityData(city);
    times = await getTimes(location, false);
    if (unix != null) {
      now = new Date(unix*1000);
      customCity = true;
    }
  }
  allPrayerTimes.textContent = `Fajr: ${times[0]} | Dhuhr: ${times[1]} | Asr: ${times[2]} | Maghrib: ${times[3]} | Isha: ${times[4]}`;
  times = [times[0], times[3]];
  location = location.substr(0, 1).toUpperCase() + location.substring(1);
  cityDisplay.textContent = location;
  times.forEach((time) => {
    rawPrayerTimes.push(time);
    prayerTimes.push(getPrayerDate(time));
  });
  msToFajr = now - prayerTimes[0];
  if (!customCity) {
    fetch('/client', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ location })
    });
  }
  setNextPrayer(true);
  update();
  let TID = setInterval(() => {
    if (locationChanged) {
      clearInterval( TID );
      locationChanged = false;
      init(locationInput.value);
    } else {
      update();
    }
  }, 1000); 
  
}
function getPrayerDate(time) {
  let string = time;
  let objectTimeCode = time.substr(time.length-2);
  if (!customCity) {
    if (objectTimeCode == "pm") {
      let modifiedHours = parseInt(time.substr(0, 2))+12;
      let newTime = modifiedHours.toString() + ":" + time.substr(2);
      string = newTime.substring(0, newTime.length-3);
    } else {
      string = string.substring(0, string.length-3);
    }
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
  let nextPrayer = prayers[nextPrayerIndex];
  nextPrayerDisplays.forEach((display) => {
    display.textContent = nextPrayer;
  });
  prayerTimeDisplay.textContent = rawPrayerTimes[nextPrayerIndex];
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
function changeLocation() {
  changingLocation = !changingLocation;
  if (changingLocation) {
    locationForm.style.display = "block";
    $('#change-location').detach().appendTo(locationForm);
    changeLocationButton.textContent = "go";
  } else {
    if (locationInput.value.length != 0) {
      $('#change-location').detach().appendTo($('.content'));
      locationForm.style.display = "none";
      changeLocationButton.textContent = "Change Location";
      locationChanged = true;
    }
  }
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
      "<img id='dua' src='http://azureassets.azureedge.net/media/" + duas[nextPrayerIndex] + "' alt='Iftar dua' width='100%' height='50%'>"
    );
  }
  $('.options').css({
    "margin-bottom":$(".options").height() / 2
  });
  if (playAdhan) {
    adhan.src = ((fullAdhan) ? "http://azureassets.azureedge.net/media/Adhan-Egypt.mp3" : "http://azureassets.azureedge.net/media/Abdul-Basit-trimmed.mp3");
    adhan.type = 'audio/wav';
    try {
      await adhan.play();
    } catch (err) {
      console.log(err);
    }
  }

}
function adaptUI() {
  if (document.body.clientWidth < 790 && !resizedDown) {
    resizedDown = true;
    resizedUp = false;
    $('#adhan-options').detach().appendTo($('.content'));
    document.getElementById("adhan-options").classList.add("resized-options");
  } else if (document.body.clientWidth > 790 && !resizedUp) {
    resizedDown = false;
    resizedUp = true;
    $('#adhan-options').detach().insertBefore($('#next-prayer-wrapper'));
    document.getElementById("adhan-options").classList.remove("resized-options");
  }
}
function errorScreen() {
  // There was a problem getting prayer times...please try again later or contact support
  document.body.innerHTML = "There was a problem getting prayer times...please try again later";
}