const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cityTimezones = require('city-timezones');
const ezlocalTime = require('ez-local-time');
const tzlookup = require("tz-lookup");
const nearbyCities = require("nearby-cities")
const citiesOfClients = [];
let totalVisits = 0;
let visitsThisHour = 0;

app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log("Listening at port " + port));
app.use(express.json({limit : '5gb'}));

app.post('/client', (request, response) => {
    const city = request.body.location;
    totalVisits++;
    if (citiesOfClients.indexOf(city) == -1) {
        citiesOfClients.push(city);
        console.log(city + " has sent its first ambassador!");
    }
    response.json({status: "success"});
});
app.get('/customCityTime', async (req, res) => {
    const dateObject = ezlocalTime(req.get("timezone"));
    res.json({
        status: 200,
        dateTime: dateObject.date + dateObject.time
    });
});
app.get('/geoData', async (req, res) => {
    const lat = req.get("lat");
    const lon = req.get("lon");
    const timezone = await tzlookup(lat, lon);
    const city = nearbyCities({latitude: lat, longitude: lon})[0];
    res.json({
        timezone: timezone,
        name: city.name
    });
});
app.get('/searchForCity', (req, res) => {
    const cityLookup = cityTimezones.lookupViaCity(req.get("city"));
    if (cityLookup.length == 0) {
        res.json({
            status: 404
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
                timezone: location.timezone
            });
        });
        res.json({
            status: 200,
            data: data
        });
    } 
});
const formatDate = (date) => {
    const hours = date.getHours();
    let suffix = "am";
    if (hours > 12) {
        hours -= 12;
        suffix = "pm"
    } 
    return `${hours}:${date.getMinutes()} ${suffix}`;
}
// log usage data every 1 hour
setInterval(() => { 
    const now = new Date();
    console.log(`Date: ${now.toDateString()} ${formatDate(now)}\nHour's Visits: ${visitsThisHour}`);
    console.log("Total Visits: " + totalVisits + "\n\n");
    visitsThisHour = 0;
}, 3600000);