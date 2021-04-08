const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const citiesOfClients = [];
const cityTimezones = require('city-timezones');
const fetch = require('node-fetch');
const ezlocalTime = require('ez-local-time');

app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log("Listening at port " + port));
app.use(express.json({limit : '5gb'}));

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
    const cityLookup = cityTimezones.lookupViaCity(city);
    if (cityLookup.length != 0) {
        const dateObject = ezlocalTime(cityLookup[0].timezone);
        response.json({
            status: 200,
            date: dateObject.date,
            time: dateObject.time.substring(1)
        });
    } else {
        response.json({
            status: 404
        });
    }
});