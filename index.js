const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const cityTimezones = require("city-timezones");
const ezlocalTime = require("ez-local-time");
const tzlookup = require("tz-lookup");
const nearbyCities = require("nearby-cities");
const citiesOfClients = [];
let totalVisits = 11032;
let visitsThisHour = 0;
console.log(__dirname);
app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => console.log("Listening at port " + port));
app.use(express.json({ limit: "5gb" }));

app.post("/client", (request, response) => {
  const city = request.body.location;
  totalVisits++;
  visitsThisHour++;
  if (citiesOfClients.indexOf(city) == -1) {
    citiesOfClients.push(city);
    console.log(city + " has sent its first ambassador!");
  }
  response.json({ status: "success" });
});
app.get("/customCityTime", async (req, res) => {
  const tz = req.get("timezone");
  if (!tz || tz == "" || tz == undefined) {
    res.json({
      status: 400, // bad request
      message: "Please provide a timezone",
    });
  }
  const dateObject = ezlocalTime(tz);
  console.log(dateObject);
  res.json({
    status: 200,
    //dateTime: dateObject.date + dateObject.time,
    dateTime: dateObject.dateTime,
  });
});
app.get("/geoData", async (req, res) => {
  const lat = req.get("lat");
  const lon = req.get("lon");
  const timezone = await tzlookup(lat, lon);
  const city = nearbyCities({ latitude: lat, longitude: lon })[0];
  res.json({
    timezone: timezone,
    name: city.name,
  });
});
app.get("/searchForCity", (req, res) => {
  const cityLookup = cityTimezones.lookupViaCity(req.get("city"));
  if (cityLookup.length == 0) {
    res.json({
      status: 404,
    });
  } else {
    let data = [];
    cityLookup.forEach((location) => {
      let name = location.city;
      if (location.state_ansi != undefined) {
        name = name + " (" + location.state_ansi + ") ";
      } else {
        name = name + ", ";
      }
      name = name + location.country;
      data.push({
        name: name,
        city: location.city,
        lat: location.lat,
        lon: location.lng,
        timezone: location.timezone,
      });
    });
    res.json({
      status: 200,
      data: data,
    });
  }
});
const formatDate = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let suffix = "am";
  if (hours > 12) {
    hours -= 12;
    suffix = "pm";
  }
  return `${hours}:${minutes} ${suffix}`;
};
// log usage data every 1 hour

const logUsageData = () => {
  const now = new Date();
  console.log(
    `\nDate: ${now.toDateString()} ${formatDate(
      now
    )}\nHour's Visits: ${visitsThisHour}`
  );
  console.log("Total Visits: " + totalVisits);
  console.log(
    "Total number of cities accessed: " + citiesOfClients.length + "\n\n"
  );
  visitsThisHour = 0;
};

logUsageData();
setInterval(logUsageData, 3600000);
