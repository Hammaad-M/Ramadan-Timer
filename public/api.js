// AlAdhan API implementation
// Interface:
//   getTimes(data) → Promise<{ times: string[], city?: string }>
//   getNextPrayerTime(date, data) → Promise<{ date: Date, time: string }>
//
// data shape: { lat, lon, timezone }

const ALADHAN_BASE = "https://api.aladhan.com/v1";

function _formatAladhanTime(timeStr) {
  // Convert "HH:MM" (24hr) to "H:MM am/pm" (12hr) to match legacy interface
  const [hoursStr, minutes] = timeStr.split(":");
  let hours = parseInt(hoursStr, 10);
  const suffix = hours >= 12 ? "pm" : "am";
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${suffix}`;
}

function _aladhanTimesToArray(timings) {
  return [
    timings.Fajr,
    timings.Dhuhr,
    timings.Asr,
    timings.Maghrib,
    timings.Isha,
  ].map(_formatAladhanTime);
}

function _formatDateForAladhan(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

async function getTimes(data) {
  const dateStr = _formatDateForAladhan(new Date());
  const url =
    `${ALADHAN_BASE}/timings/${dateStr}` +
    `?latitude=${data.lat}&longitude=${data.lon}` +
    `&method=${calcMethod}&timezone=${encodeURIComponent(data.timezone)}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.code !== 200) {
      console.error("AlAdhan API error", json);
      return null;
    }
    const times = _aladhanTimesToArray(json.data.timings);
    return { times };
  } catch (e) {
    console.error("AlAdhan getTimes failed", e);
    return null;
  }
}

async function getNextPrayerTime(date, data) {
  const dateStr = _formatDateForAladhan(date);
  const url =
    `${ALADHAN_BASE}/timings/${dateStr}` +
    `?latitude=${data.lat}&longitude=${data.lon}` +
    `&method=${calcMethod}&timezone=${encodeURIComponent(data.timezone)}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.code !== 200) {
      err = true;
      return { date, time: "12:00 am" };
    }
    const fajrRaw = json.data.timings.Fajr; // "HH:MM"
    const [h, m] = fajrRaw.split(":").map(Number);
    date.setHours(h, m, 0);
    return { date, time: "*" + _formatAladhanTime(fajrRaw) };
  } catch (e) {
    console.error("AlAdhan getNextPrayerTime failed", e);
    err = true;
    return { date, time: "12:00 am" };
  }
}
