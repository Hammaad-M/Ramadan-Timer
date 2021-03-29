const express = require('express');
const cityTimezones = require('city-timezones');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;
const citiesOfClients = [];

app.listen(port, () => console.log("Listening at port " + port));
app.use(express.static('public'));
app.use(express.json({limit : '5gb'}));

async function getLocalCityTime(zone) {
    return new Promise(async (resolve) => {
        let response = await fetch('http://api.timezonedb.com/v2.1/get-time-zone?key=IVNNFCYK4ANS&format=json&by=zone&zone=' + zone);
        response = await response.json();
        resolve(response);
    });
}   

app.post('/client', (request) => {
    const city = request.body.location;
    if (citiesOfClients.indexOf(city) == -1) {
        citiesOfClients.push(city);
        console.log(citiesOfClients);
    }
});
app.post('/localCityTime', async (request, response) => {
    const info = request.body;
    const city = info.city;
    const cityLookup = cityTimezones.lookupViaCity(city);
    if (cityLookup.length != 0) {
        const res = await getLocalCityTime(cityLookup[0].timezone);
        response.json({
            status: 200,
            formatted: res.formatted
        });
    } else {
        response.json({
            status: 404
        });
    }
});