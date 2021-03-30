let prayerTimes = [];
let rawPrayerTimes = [];
let now = new Date();
let nextPrayer;
let changingLocation = false;
let locationChanged = false;
const prayers = ["Fajr/Sunrise", "Maghrib/Sunset"];
const countdown = document.getElementById("countdown");
const nextPrayerDisplays = document.querySelectorAll(".next-prayer");
const prayerTimeDisplay = document.getElementById("prayer-time");
const cityDisplay = document.getElementById("location");
const locationForm = document.querySelector(".location-form");
const changeLocationButton = document.getElementById("change-location");
const locationInput = document.getElementById("city-input");
const currentTime = document.getElementById("current-time");

async function getTimes(city) {
  cityDisplay.textContent = city;
  if (!('fetch' in window)) {
    alert("Fetch API disabled or not found...unable to get time remaining.");
    return;
  }
  let times = [];
  return new Promise(async (resolve) => {
    await jQuery(async ($) => {
      $.getJSON('https://muslimsalat.com/' + city + '.json?jsoncallback=?', (response) => {
        times.push(response.items[0].fajr, response.items[0].maghrib);
        resolve(times);
      });
    });
  });
}
async function getLocation() {
  return new Promise(async (resolve) => {
    await jQuery(async ($) => {
      $.getJSON('https://ipapi.co/json/', (data) => {
        resolve(data);
      });
    })
  })
}

function update() {
  let now = new Date();
  remaining = msToTime(prayerTimes[getNextPrayer()] - now);
  countdown.textContent = `${format(remaining.hours)}:${format(remaining.minutes)}:${format(remaining.seconds)}`;
  currentTime.textContent =  `${format(now.getHours())}:${format(now.getMinutes())}:${format(now.getSeconds())}`;
  
}

async function init(city) {
  prayerTimes = [];
  rawPrayerTimes = [];
  nextPrayer = "";
  let location;
  if (city == null) {
    location = await getLocation();
    location = location.city;
    locationForm.style.display = "none";
  } else {
    location = city;
  }
  const times = await getTimes(location);
  times.forEach((time) => {
    rawPrayerTimes.push(time);
    prayerTimes.push(getPrayerDate(time));
  });
  msToFajr = now - prayerTimes[0];
  console.log(prayerTimes)
  console.log(rawPrayerTimes)
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

function changeLocation() {
  changingLocation = !changingLocation;
  if (changingLocation) {
    locationForm.style.display = "block";
    changeLocationButton.textContent = "apply";
  } else {
    locationForm.style.display = "none";
    changeLocationButton.textContent = "Change Location";
    locationChanged = true;
  }
}