const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const citiesOfClients = [];
const cityTimezones = require('city-timezones');
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
app.get('/customCityTime', async (req, res) => {
    const dateObject = ezlocalTime(req.get("timezone"));
    res.json({
        status: 200,
        dateTime: dateObject.date + dateObject.time
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