// IslamicFinder legacy API implementation
// Interface:
//   getTimes(data) → Promise<{ times: string[], city?: string }>
//   getNextPrayerTime(date, data) → Promise<{ date: Date, time: string }>

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
              console.error("Invalid Response", response);
              resolve(null);
            } else {
              times = timesToArray(response);
              let city = response.settings.location.city;
              resolve({ times, city });
            }
          }
        ).fail(() => {
          errorDisplay.textContent =
            "Sorry, the servers are down. Unable to fetch prayer times. ";
          resolve(null);
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
              resolve({ times });
            }
          }
        );
      });
    }
  });
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
          resolve({ date: date, time: "*" + string });
        }
      });
    });
  });
}
