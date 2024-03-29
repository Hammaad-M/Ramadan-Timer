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
const dateDisplay = document.getElementById("date");
const errorDisplay = document.getElementById("error-display");

const progressBar = document.querySelector(".progress-bar");
const progressDisplay = document.querySelector("#progress-display");
const star = document.querySelector(".star");
const offsetDisplay = document.querySelector(".offset-display");
document.getElementById("adhan-off").checked = true;
let TIDs = [];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
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
  flexedPrayerTimes: false,
};
let myCity = null;
let alertEffect = false;
let err = false;
let loaded = false;
let midnight;
let bgColor;
let lastMinutes;
let lastSeconds;
let backup = null;
let lostFocus = false;
let refresh = false;
let first = true;
let lastInit;
let useIP;
let fastDuration;
let todayFajrTime;
let initializing = false;

let offset = 0;

const calcMethodDropdown = document.getElementById("calculation-method");
let calcMethod = localStorage.getItem("calcMethod") || 2;

calcMethodDropdown.value = calcMethod;

function addMillisecondsToTimeString(timeString, milliseconds) {
  // Split the time string into hours, minutes, and AM/PM
  const [time, ampm] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));

  // Convert the hours to 24-hour format
  let hours24 = hours;
  if (ampm === "PM" && hours !== 12) {
    hours24 += 12;
  } else if (ampm === "AM" && hours === 12) {
    hours24 = 0;
  }

  // Calculate the total number of milliseconds since midnight
  const totalMilliseconds = (hours24 * 60 + minutes) * 60 * 1000 + milliseconds;

  // Convert the total milliseconds back to hours, minutes, and AM/PM
  const newHours24 = Math.floor(totalMilliseconds / (60 * 60 * 1000)) % 24;
  const newMinutes = Math.floor(totalMilliseconds / (60 * 1000)) % 60;
  const newAmPm = newHours24 < 12 ? "AM" : "PM";
  const newHours = newHours24 % 12 || 12;

  // Combine the new hours, minutes, and AM/PM into a string and return it
  const newTime = `${Math.abs(newHours)}:${Math.abs(newMinutes)
    .toString()
    .padStart(2, "0")} ${newAmPm}`;

  return newTime;
}

const updateOffset = (change) => {
  if (
    change < 0 &&
    remaining.minutes + remaining.hours * 60 <= Math.abs(change)
  )
    return;

  const milliseconds = change * 1000 * 60;
  if (Math.abs((offset + milliseconds) / 1000 / 60) > 240) {
    alert("Offset too large");
    return;
  }
  offset += milliseconds;
  const offsetMinutes = offset / 1000 / 60;
  star.style.display = "block";
  offsetDisplay.textContent = offsetMinutes;
  const newTime = addMillisecondsToTimeString(
    prayerTimeDisplay.textContent,
    milliseconds
  );
  prayerTimeDisplay.textContent = newTime;
  if (offsetMinutes === 0) {
    if (nextPrayerIndex === 0) {
      document.getElementById("prayer-time-0").textContent =
        newTime.toLowerCase();
      document.querySelector(".star-0").style.display = "none";
    } else {
      document.querySelector(".star-3").style.display = "none";
      document.getElementById("prayer-time-3").textContent =
        newTime.toLowerCase();
    }
    star.style.display = "none";
  } else {
    // if fajr is next
    if (nextPrayerIndex === 0) {
      document.querySelector(".star-0").style.display = "block";
      document.getElementById("prayer-time-0").textContent =
        newTime.toLowerCase();
    } else {
      document.querySelector(".star-3").style.display = "block";
      document.getElementById("prayer-time-3").textContent =
        newTime.toLowerCase();
    }
  }
};

const resetOffset = () => {
  const oldTime = addMillisecondsToTimeString(
    prayerTimeDisplay.textContent,
    offset * -1
  );
  prayerTimeDisplay.textContent = oldTime;
  // offsetDisplay.textContent = prayerTimeDisplay.textContent;
  star.style.display = "none";
  offsetDisplay.textContent = 0;
  offset = 0;
  try {
    if (nextPrayerIndex === 0) {
      document.getElementById("prayer-time-0").textContent =
        oldTime.toLowerCase();
      document.querySelector(".star-0").style.display = "none";
    } else {
      document.getElementById("prayer-time-3").textContent =
        oldTime.toLowerCase();
      document.querySelector(".star-3").style.display = "none";
    }
  } catch (err) {
    console.warn("error handling stars...", err);
  }
  // localStorage.setItem(nextPrayerIndex, offset);
};

function setMidnight() {
  midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day, ...
    0,
    0,
    0 // ...at 00:00:00 hours
  );
}
function newInit(params) {
  // return if an initialization call has already been made
  if (initializing) {
    return;
  }

  initializing = true;
  TIDs.forEach((TID) => clearInterval(TID));
  init(params);
}
async function getTimes(data) {
  if (!("fetch" in window)) {
    alert("Fetch API disabled or not found...unable to get prayer times.");
    return;
  }
  let times = [];
  return new Promise(async (resolve) => {
    if (useIP) {
      await jQuery(async ($) => {
        $.getJSON(
          "https://www.islamicfinder.us/index.php/api/prayer_times?method=" +
            calcMethod +
            "&user_ip=" +
            data.ip,
          (response) => {
            console.log(response);
            if (response.success == false || !response) {
              // err = true;
              console.error("Invalid Response", response);
              // errorScreen(101);
              resolve(null);
            } else {
              times = timesToArray(response);
              let city = response.settings.location.city;
              resolve({ times, city });
            }
          }
        ).fail((jqxhr, textStatus, error) => {
          // Use backup API
          errorDisplay.textContent =
            "Sorry, the servers are down. Unable to fetch prayer times. ";
        });
      });
    } else {
      await jQuery(async ($) => {
        $.getJSON(
          "https://www.islamicfinder.us/index.php/api/prayer_times?method=" +
            calcMethod +
            "&latitude=" +
            data.lat +
            "&longitude=" +
            data.lon +
            "&timezone=" +
            data.timezone,
          (response) => {
            if (!response.success) {
              err = true;
              errorScreen(101);
            } else {
              times = timesToArray(response);
              resolve(times);
            }
          }
        );
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
      const res = $.getJSON("https://ipapi.co/json/", (data) => {
        if (!data) {
          err = true;
          console.error("Invalid data value", data);
          errorScreen(202);
        } else {
          resolve(data);
        }
      });
      res.fail(() => {
        resolve(null);
      });
    });
  });
}
document.addEventListener("visibilitychange", () => {
  if (lostFocus && !document.hidden) {
    refresh = true;
    lostFocus = false;
  } else if (document.hidden) {
    lostFocus = true;
  }
});
function updateProgressBar(total, progress) {
  total = Math.abs(total);
  progress = Math.abs(progress);
  if (nextPrayerIndex === 1) {
    const percentage = (progress / total) * 100;
    const displayPercentage = percentage.toFixed(2);

    progressBar.style.width = percentage + "%";
    progressDisplay.textContent =
      "Fasting Time: " + displayPercentage + "% Completed";
  } else {
    const percentage = (1 - progress / total) * 100;
    progressBar.style.width = percentage + "%";
    const displayPercentage = percentage.toFixed(2);

    progressDisplay.textContent =
      "Eating Time: " + displayPercentage + "% Remaining";
  }
}
function update(times) {
  // alert(unix);
  if (!customCity) {
    now = new Date();
  } else {
    unix += 1000;
    now = new Date(unix);
    if (refresh) {
      lostFocus = false;
      refresh = false;
      newInit(backup);
      return;
    }
  }
  currentTime.textContent = to12hrTime(now);
  dateDisplay.textContent = `${days[now.getDay()]}, ${
    months[now.getMonth()]
  } ${now.getDate()}, ${now.getFullYear()} - `;
  if (pauseCounter > 18 || nextPrayerIndex === 1) {
    if (pauseCounter == 19) {
      $("#dua").remove();
    }

    remaining = msToTime(prayerTimes[nextPrayerIndex] - now + offset);
    //alert(unix);

    updateProgressBar(
      fastDuration + offset,
      nextPrayerIndex === 1 ? now - todayFajrTime : now - yesterdayMaghrib
    );

    if (remaining.minutes === lastMinutes && remaining.seconds > lastSeconds) {
      let params = customCity ? backup : null;
      newInit(params);
      return;
    }
    if (remaining.hours == 0 && remaining.minutes == 0) {
      if (remaining.seconds == 0) {
        endCountdown();
        resetOffset();
        if (nextPrayerIndex === 1) {
          yesterdayMaghrib = new Date();
        } else {
          todayFajrTime = new Date();
        }
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
  if (midnight - now <= 0) {
    setMidnight();
    let params = customCity ? backup : null;
    newInit(params);
    return;
  }
  lastMinutes = remaining.minutes;
  lastSeconds = remaining.seconds;
  // if (nextPrayerIndex < 0 || nextPrayerIndex > 1) {
  //   newInit(params);
  // }
}
function updateCountdown(remaining) {
  countdown.textContent = `${format(remaining.hours)}:${format(
    remaining.minutes
  )}:${format(remaining.seconds)}`;
}
async function getCustomCityTime(timezone) {
  //console.log(timezone);
  const response = await fetch("/customCityTime", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      timezone: timezone,
    },
  });
  const res = await response.json();

  if (res.status == 404) {
    err = true;
    console.error("Invalid response status", res);
    errorScreen(303);
  } else {
    return new Date(
      res.dateTime.substring(0, res.dateTime.length - 1)
    ).getTime();
  }
}
function resetContent() {
  TIDs.forEach((TID) => clearInterval(TID));
  addHoverEffect("find-me");
  addHoverEffect("geolocate-me");
  $(".dropdown").hide();
  err = false;
  prayerTimes = [];
  nextPrayerIndex = 0;
  Object.keys(UIToggles).forEach((toggle) => (UIToggles[toggle] = null));
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
    if (user === null) {
      newInit(backup);
      return;
    }
  } else {
    user = await setCustomLocation(city);
  }
  const location = user.location;
  const queryData = user.queryData;
  let times = user.times;
  resetChangeLocation();
  toggleLoadingScreen();

  if (!err) {
    await finalSetup(
      times,
      location,
      queryData,
      city == null && first ? true : false
    );
    document.getElementById("current-year").textContent = now.getFullYear();
    // set fast duration
    if (nextPrayerIndex === 0) {
      fastDuration = fajrTommorow
        ? prayerTimes[0] - prayerTimes[1]
        : prayerTimes[0] - yesterdayMaghrib;
    }
    // prayerTimes[0] is next Fajr time if next fajr is tommorow
    else fastDuration = prayerTimes[1] - todayFajrTime;
    resetOffset();

    initializing = false;
    TIDs.forEach(clearInterval);
    update(times);
    TIDs.push(
      setInterval(() => {
        update(times);
      }, 1000)
    );
  } else {
    initializing = false;
    allPrayerTimes.style.display = "none";
    console.error("Error flag was triggered. Abandoning setup.");
    errorScreen(400);
    TIDs.forEach(clearInterval);
    TIDs.push(
      setInterval(() => {
        adaptUI();
      }, 500)
    );
  }
}
async function finalSetup(times, location, queryData, newUser) {
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
  };
  await asyncForEach();
  fajrTommorow = false;

  if (nextFajrTime.indexOf("*") != -1) {
    nextFajrTime = nextFajrTime.replace("*", "");
    fajrTommorow = true;
  }
  todayFajrTime = to24hrTime(times[0]);
  const today = [now.getFullYear(), now.getMonth(), now.getDate()];
  todayFajrTime = new Date(
    ...today,
    todayFajrTime.substr(0, todayFajrTime.indexOf(":")),
    todayFajrTime.substr(todayFajrTime.indexOf(":") + 1),
    0,
    0
  );
  yesterdayMaghrib = to24hrTime(times[3]);
  yesterdayMaghrib = new Date(
    ...today.slice(0, 2),
    now.getHours() > 12 ? today[2] : today[2] - 1,
    yesterdayMaghrib.substr(0, yesterdayMaghrib.indexOf(":")),
    yesterdayMaghrib.substr(yesterdayMaghrib.indexOf(":") + 1),
    0,
    0
  );
  displayAllPrayerTimes(times);
  times = [times[0], times[3]];
  location = location.substr(0, 1).toUpperCase() + location.substring(1);
  cityDisplay.textContent = location;
  if (newUser) {
    fetch("/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location }),
    });
    first = false;
  }
  setNextPrayer(true, times);
  countdown.classList.remove("err-display");
  allPrayerTimes.style.display = "block";
  setMidnight();
}
async function getUserData() {
  let location;
  let queryData;
  let times;

  const handleError = async () => {
    console.error(err);
    if (
      window.confirm(
        "Unable to guess your location...would you like to geolocate?"
      )
    ) {
      geoLocate(true);
      return null;
    } else {
      queryData = backup;
      useIP = false;
      times = await getTimes(backup);
      location = "Seattle";
      toggleLoadingScreen();
    }
  };

  try {
    location = await getLocation();
    if (location === null) {
      await handleError();
      return null;
    }
    queryData = { ip: location.ip };
    useIP = true;
    const data = await getTimes(queryData);
    location = data.city;

    times = data.times;
    if (myCity === null) {
      myCity = location.toLowerCase();
    }
    locationForm.style.display = "none";
    customCity = false;
    now = new Date();
    return { location, queryData, times };
  } catch (err) {
    await handleError();
    return null;
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

  return { location: city.city, times: times, queryData: queryData };
}
function geoLocate(reload) {
  if (!navigator.geolocation) {
    alert("Geolocaton is not supported in your browser...");
  } else {
    const checkReload = () => {
      if (reload) {
        toggleLoadingScreen();
      }
    };
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        data = await fetch("/geoData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            lat: lat,
            lon: lon,
          },
        });
        data = await data.json();
        customCity = true;
        checkReload();
        newInit({
          name: data.name,
          timezone: data.timezone,
          lat: lat,
          lon: lon,
          city: data.name,
        });
      },
      (err) => {
        if (err.code === 1) {
          alert(
            "You have disabled geolocation...please enter your location manually."
          );
        } else {
          alert("Unable to geolocate...please enter your location manually.");
        }
        checkReload();
        newInit(backup);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }
}
async function getPrayerDate(time, data, nextPrayer) {
  let string = to24hrTime(time);
  const hours = string.substr(0, string.length == 5 ? 2 : 1);
  const minutes = string.substr(string.length - 2, 2);
  let date = new Date(now.toDateString());
  date.setHours(hours, minutes, 0);
  if (date - now < 0 && nextPrayer === 0) {
    date.setDate(now.getDate() + 1);
    const prayer = await getNextPrayerTime(date, data, nextPrayer);
    date = prayer.date;
    time = prayer.time;
  }
  return { date, time };
}
function getNextPrayerTime(date, data) {
  let dateString =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  let query = useIP
    ? "https://www.islamicfinder.us/index.php/api/prayer_times?method=" +
      calcMethod +
      "&user_ip=" +
      data.ip +
      "&date=" +
      dateString
    : "https://www.islamicfinder.us/index.php/api/prayer_times?method=" +
      calcMethod +
      "&latitude=" +
      data.lat +
      "&longitude=" +
      data.lon +
      "&timezone=" +
      data.timezone +
      "&date=" +
      dateString;
  return new Promise(async (resolve) => {
    await jQuery(async ($) => {
      $.getJSON(query, (res) => {
        if (!res.success) {
          err = true;
          resolve(date);
        } else {
          let string = timesToArray(res)[0];
          const hours = parseInt(string.substring(0, string.indexOf(":")));
          const minutes = parseInt(
            string.substring(string.indexOf(":") + 1, string.indexOf("m") - 2)
          );
          date.setHours(hours);
          date.setMinutes(minutes);
          //alert(JSON.stringify({ date: date, time: "*" + string }));
          resolve({ date: date, time: "*" + string });
        }
      });
    });
  });
}
function to24hrTime(time) {
  let string = time;
  let objectTimeCode = time.substr(time.length - 2);
  if (objectTimeCode.toLowerCase() == "pm") {
    let modifiedHours = parseInt(time.substr(0, 2)) + 12;
    let newTime = modifiedHours.toString() + ":" + time.substr(2);
    let check = newTime.substring(0, newTime.length - 3);
    if (charCount(check, ":") >= 3) {
      check = check.replace(":", "");
    }
    return check;
  } else {
    return string.substring(0, string.length - 3);
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
  // console.log(ms);
  ms = Math.abs(ms);
  // console.log(ms);
  let seconds = ms / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  seconds = Math.trunc(seconds % 60);
  minutes = Math.trunc(minutes % 60);
  hours = Math.trunc(hours);
  if (seconds == 60) {
    minutes += 1;
    seconds = 0;
  }
  if (minutes == 60) {
    hours += 1;
    minutes = 0;
  }
  return { hours, minutes, seconds };
}
function setNextPrayer(first, times) {
  const getIndex = () => {
    if (times.length > 2) {
      return nextPrayerIndex == 1 ? 3 : 0;
    } else {
      return nextPrayerIndex == 1 ? 1 : 0;
    }
  };
  if (!first) {
    nextPrayerIndex = nextPrayerIndex === 1 ? 0 : 1;
  } else {
    let closest = null;
    let index = 0;
    prayerTimes.forEach((time, i) => {
      let diff = time - now;
      if (closest === null || (diff <= closest && diff > -1)) {
        closest = diff;
        index = i;
      }
    });
    nextPrayerIndex = index;
  }
  if (nextPrayerIndex === 0) {
    bgColor = "rgba(40, 73, 10, 0.925)";
    changeFavicon("./green.png");
  } else {
    bgColor = "rgba(109, 30, 30, 0.959)";
    changeFavicon("./red.png");
  }
  document.body.style.backgroundColor = bgColor;
  nextPrayerDisplays.forEach((display) => {
    let prefix = nextPrayerIndex == 0 && fajrTommorow ? "Next " : "";
    display.textContent = prefix + prayers[nextPrayerIndex];
  });
  let time =
    fajrTommorow && nextPrayerIndex == 0 ? nextFajrTime : times[getIndex()];
  prayerTimeDisplay.textContent = to12hrDisplayTime(time).toUpperCase();
  // offsetDisplay.textContent = prayerTimeDisplay.textContent;
}
function format(string) {
  if (string < 10) {
    return "0" + string;
  } else {
    return string;
  }
}
function to12hrTime(date) {
  const newHours = ((date.getHours() + 11) % 12) + 1;
  const suffix = date.getHours() >= 12 ? "PM" : "AM";
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  return (
    newHours +
    ":" +
    minutes.substr(minutes.length - 2, 2) +
    ":" +
    seconds.substr(seconds.length - 2, 2) +
    " " +
    suffix
  );
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
  $("#change-location").detach().appendTo(locationForm);
  $("#choose-location").detach().appendTo(locationForm);
  changeLocationButton.textContent = "search";
  changeLocationButton.onclick = searchForLocation;
  $(".dropdown").show();
  $("#options-wrapper").show();
}
function changeCalculationMethod() {
  calcMethod = calcMethodDropdown.value;
  // save calcMethod to localStorage
  localStorage.setItem("calcMethod", calcMethod);

  if (customCity) newInit(backup);
  else newInit(null);
}
async function searchForLocation() {
  const city = locationInput.value;
  if (city.length > 0) {
    $("#options-wrapper").empty();
    let response = await fetch("/searchForCity", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        City: city,
      },
    });
    response = await response.json();
    if (response.status === 200) {
      response.data.forEach((location, i) => {
        $("#options-wrapper").append(
          `<button id="${i}" onclick='newInit({
            name: "${location.name}", lat: ${location.lat}, lon: ${location.lon}, timezone: "${location.timezone}", city: "${location.city}"
          })' class="drop-down-buttons subtitles">${location.name}</button>`
        );
        addHoverEffect(i);
      });
    } else {
      $("#options-wrapper").css({
        "background-color": "white",
        color: "black",
      });
      $("#options-wrapper").append(`<p class="subtitles">No Match Found</p>`);
    }
    $("#options-wrapper").append(
      `<button id="find-me" onclick='newInit(null)' class="drop-down-buttons subtitles">Guess my Location</button>
      <button id="geolocate-me" onclick='geoLocate(false)' class="drop-down-buttons subtitles">Geolocate Me</button>`
    );
    $(".dropdown").show();
  }
}
function addHoverEffect(i) {
  $(document)
    .on("mouseenter", "#" + i, () => {
      $("#" + i).css({
        "background-color": bgColor,
        color: "white",
      });
    })
    .on("mouseleave", "#" + i, () => {
      $("#" + i).css({
        "background-color": "white",
        color: "black",
      });
    });
}
function resetChangeLocation() {
  $(".dropdown").hide();
  $("#options-wrapper").hide();
  $("#change-location").detach().insertBefore($(".location-form"));
  locationForm.style.display = "none";
  changeLocationButton.textContent = "Change Location";
  changeLocationButton.onclick = changeLocation;
}
function displayAllPrayerTimes(times) {
  let prayerList = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  document.getElementById("all-prayer-times").innerHTML = "";
  times.forEach((time, i) => {
    $("#all-prayer-times").append(
      `<div><p>${
        prayerList[i]
      }: &#8287&#8287&#8287 <span id="prayer-time-${i}">${to12hrDisplayTime(
        time
      )}</span></p><svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      height="1em"
      width="1em"
      class="hidden table-star star-${i}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
      ></path>
    </svg></div>`
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
    $(".content").prepend(
      "<img id='dua' src='https://azureassets.azureedge.net/media/" +
        duas[nextPrayerIndex] +
        "' alt='Iftar dua' width='100%' height='50%'>"
    );
  } else {
    countdown.innerHTML = "00:00:00";
    createAlertEffects(0);
  }
  $(".options").css({
    "margin-bottom": $(".options").height() / 2,
  });
  if (playAdhan) {
    adhan.src = fullAdhan
      ? "https://azureassets.azureedge.net/media/Adhan-Egypt.mp3"
      : "https://azureassets.azureedge.net/media/Abdul-Basit-trimmed.mp3";
    adhan.type = "audio/wav";
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
    let color = nextPrayerIndex == 1 ? "rgb(51,255,119)" : "rgb(255,51,51)";
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
  countdown.style.textShadow = "none";
  countdown.style.color = "white";
}
function adaptUI() {
  const screenWidth = document.body.clientWidth;
  if (screenWidth < 1200) {
    if (!UIToggles.prayerResizedDown) {
      UIToggles.prayerResizedDown = true;
      UIToggles.prayerResizedUp = false;
      $("#all-prayer-times").detach().appendTo($("#mobile-options-wrapper"));
      allPrayerTimes.classList.add("resized");
    }
    if (screenWidth >= 900 && !UIToggles.flexedPrayerTimes) {
      flexPrayerTimes(true);
      UIToggles.flexedPrayerTimes = true;
    } else if (screenWidth < 900 && UIToggles.flexedPrayerTimes) {
      flexPrayerTimes(false);
      UIToggles.flexedPrayerTimes = false;
    }
  } else if (screenWidth >= 1200 && !UIToggles.prayerResizedUp) {
    UIToggles.prayerResizedDown = false;
    UIToggles.prayerResizedUp = true;
    UIToggles.flexedPrayerTimes = false;
    $("#all-prayer-times").detach().insertBefore($(".location-form"));
    allPrayerTimes.classList.remove("resized");
    flexPrayerTimes(false);
  }

  if (screenWidth < 790 && !UIToggles.adhanResizedDown) {
    UIToggles.adhanResizedDown = true;
    UIToggles.adhanResizedUp = false;
    $("#adhan-options").detach().appendTo($("#mobile-options-wrapper"));
    adhanOptions.classList.add("resized");
  } else if (screenWidth >= 790 && !UIToggles.adhanResizedUp) {
    UIToggles.adhanResizedDown = false;
    UIToggles.adhanResizedUp = true;
    $("#adhan-options").detach().insertBefore($("#next-prayer-wrapper"));
    adhanOptions.classList.remove("resized");
  }
}
function flexPrayerTimes(flex) {
  if (flex) {
    $("#all-prayer-times").css({
      display: "flex",
      "flex-direction": "row",
      gap: "5px",
    });
  } else {
    $("#all-prayer-times").css({
      display: "block",
    });
    $("#all-prayer-times").children().css("margin-right", "0");
  }
}
function toggleLoadingScreen() {
  if (!loaded) {
    document.querySelector(".page").style.display = "none";
    $("section.loading, h1.loading, h2.loading").fadeIn(0);
  } else {
    $("section.loading, h1.loading, h2.loading").fadeOut(500);
    setTimeout(
      () => (document.querySelector(".page").style.display = "initial"),
      700
    );
  }
  loaded = !loaded;
}
function errorScreen(code) {
  toggleLoadingScreen();
  const page = document.querySelector(".page");
  page.innerHTML = "We encountered an error. Please try again later.";
  const reload = document.createElement("a");
  reload.href = "https://ramadantimer.com";
  reload.style.color = "white";
  reload.textContent = "Reload";
  const errCode = document.createElement("p");
  errCode.textContent = `Error Code: ${code}`;
  const br = document.createElement("br");
  page.appendChild(br);
  page.appendChild(errCode);
  page.appendChild(reload);
  currentTime.textContent = "--";
  countdown.classList.add("err-display");
}
$(document).mouseup((e) => {
  const container = $(".dropdown");
  // if the target of the click isn't the container nor a descendant of the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.hide();
  }
});

document.head = document.head || document.getElementsByTagName("head")[0];
function changeFavicon(src) {
  const link = document.createElement("link");
  const oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}
