let prayerTimes = [];
let rawPrayerTimes = [];
let now = new Date();
let nextPrayer;
const prayers = ["Fajr/Sunrise", "Maghrib/Sunset"];
const countdown = document.getElementById("countdown");
const nextPrayerDisplays = document.querySelectorAll(".next-prayer");
const prayerTimeDisplay = document.getElementById("prayer-time");

async function getTimes() {
  if (!('fetch' in window)) {
    alert("Fetch API disabled or not found...unable to get time remaining.");
    return;
  }
  let times = [];
  return new Promise(async (resolve) => {
    await jQuery(async ($) => {
      $.getJSON('https://muslimsalat.com/seattle.json?jsoncallback=?', (response) => {
        times.push(response.items[0].fajr, response.items[0].maghrib);
        resolve(times);
      });
    });
  });
}

function update() {
  let now = new Date();
  remaining = msToTime(prayerTimes[getNextPrayer()] - now);
  countdown.textContent = `${format(remaining.hours)}:${format(remaining.minutes)}:${format(remaining.seconds)}`;
}

async function init() {
  const times = await getTimes();
  times.forEach((time) => {
    rawPrayerTimes.push(time);
    prayerTimes.push(getPrayerDate(time));
  });
  msToFajr = now - prayerTimes[0];
  update();
  setInterval(() => update(), 1000);
};



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
  let closestPrayer;
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