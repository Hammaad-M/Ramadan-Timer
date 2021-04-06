const express = require('express');
const app = express();
const port = rocess.env.PORT || 8080;
const citiesOfClients = [];

app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log("Listening at port " + port));
app.use(express.json({limit : '5gb'}));

async function getLocalCityTime(zone) {
    const fetch = require('node-fetch');
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
app.post('/customCity', async (request, response) => {
    const info = request.body;
    const city = info.city;
    const cityTimezones = require('city-timezones');
    const cityLookup = cityTimezones.lookupViaCity(city);
    if (cityLookup.length != 0) {
        const res = await getLocalCityTime(cityLookup[0].timezone);
        response.json({
            status: 200,
            formattedTime: res.formatted,
            countryCode: res.countryCode
        });
    } else {
        response.json({
            status: 404
        });
    }
});