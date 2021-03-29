let prayerTimes = [];
let rawPrayerTimes = [];
let now = new Date();
let nextPrayer;
let nextPrayerIndex;
let changingLocation = false;
let locationChanged = false;
let customCity = false;
let citySupported;
let unix;
let first = true;
let pauseCounter = 16;
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

async function getTimes(city) {
  if (!('fetch' in window)) {
    alert("Fetch API disabled or not found...unable to get prayer times.");
    return;
  }
  let times = [];
  return new Promise(async (resolve) => {
    await jQuery(async ($) => {
      $.getJSON('https://muslimsalat.com/' + city + '.json?jsoncallback=?', (response) => {
        if (!response.items) {
          citySupported = false;
          alert("City not supported.")
          init(null);
        } else {
          citySupported = true;
          times.push(response.items[0].fajr, response.items[0].dhuhr, response.items[0].asr, response.items[0].maghrib, response.items[0].isha);
          resolve(times);
        }
      });
    });
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
  console.log(pauseCounter)
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
    
    if (first) {
      remaining.hours = 0;
      remaining.seconds = 0;
      remaining.minutes = 0;
      first = false;
    }
    
    if (remaining.seconds == 0 && remaining.minutes == 0 && remaining.hours == 0) {
      countdown.innerHTML = "";
      pauseCounter = 0;
      $('.content').prepend(
        "<img id='dua' src='" + duas[nextPrayerIndex] + "' alt='Iftar dua' width='100%' height='50%'>"
      );
      nextPrayerIndex = getNextPrayer();
    } else {
      countdown.textContent = `${format(remaining.hours)}:${format(remaining.minutes)}:${format(remaining.seconds)}`;
    }
  } else {
    pauseCounter += 1;
  }
  
}
async function getCustomTimeStamp(city) {
  const data = { city };
  const response = await fetch('/localCityTime', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    }, 
    body: JSON.stringify(data)
  });
  const localCityTime = await response.json();
  if (localCityTime.status == 404) {
    alert("Unable to get current time for your city...try entering a local major city instead.");
    return null;
  } else {
    return new Date(localCityTime.formatted).getTime() / 1000;
  }
  
}
async function init(city) { 
  prayerTimes = [];
  rawPrayerTimes = [];
  nextPrayer = "";
  let location;
  let times;
  if (city == null) {
    location = await getLocation();
    location = location.city;
    locationForm.style.display = "none";
    customCity = false;
    times = await getTimes(location);
  } else {
    offset = await getLocation()
    location = city;
    times = await getTimes(location);
    unix = await getCustomTimeStamp(city);
    if (unix != null) {
      now = new Date(unix*1000);
      customCity = true;
    }
  }
  allPrayerTimes.textContent = `Local Prayer Times | Fajr: ${times[0]}, Dhuhr: ${times[1]}, Asr: ${times[2]}, Maghrib: ${times[3]}, Isha: ${times[4]}`;
  times = [times[0], times[4]];
  console.log(times);
  location = location.substr(0, 1).toUpperCase() + location.substring(1);
  cityDisplay.textContent = location;
  times.forEach((time) => {
    rawPrayerTimes.push(time);
    prayerTimes.push(getPrayerDate(time));
  });
  msToFajr = now - prayerTimes[0];
  fetch('/client', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({ location })
  });
  nextPrayerIndex = getNextPrayer();
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
  if (objectTimeCode == "pm") {
    let modifiedHours = parseInt(time.substr(0, 2))+12;
    let newTime = modifiedHours.toString() + ":" + time.substr(2);
    string = newTime.substring(0, newTime.length-3);
  } else {
    string = string.substring(0, string.length-3);
  }
  const hours = string.substr(0, (string.length == 5) ? 2 : 1);
  const minutes = string.substr(string.length-2, 2);
  let date = new Date(now.toDateString());
  date.setHours(hours, minutes, 0);
  if (date - now < 0) {
    date.setDate(now.getDate() + 1); 
  }
  console.log(date.toDateString() + " | " + date.getHours() + ":" + date.getMinutes());
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
function getNextPrayer() {
  let closest = prayerTimes[0] - now;
  let closestPrayer = prayers[0];

  prayerTimes.forEach((time, i) => {
    if (time - now < closest) {
      closest = time;
      closestPrayer = prayers[i];
    }
  });
  if (closestPrayer != nextPrayer) {
    nextPrayer = closestPrayer;
    nextPrayerDisplays.forEach((display) => {
      display.textContent = nextPrayer;
    });
    prayerTimeDisplay.textContent = rawPrayerTimes[prayers.indexOf(closestPrayer)];
  }
  return prayers.indexOf(closestPrayer);
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
  return newHours + ':' + date.getMinutes() + ':' + date.getSeconds() + " " + suffix;
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
