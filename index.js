const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cityTimezones = require('city-timezones');
const ezlocalTime = require('ez-local-time');
const tzlookup = require("tz-lookup");
const nearbyCities = require("nearby-cities")


const citiesOfClients = [
    'Bellevue',       'Everett',              'Santa Clara',
    'Mumbai',         'Fremont',              'Seattle',
    'Auburn',         'Beaverton',            'San Diego',
    'Bothell',        'San Marcos',           'Sammamish',
    'Auckland',       'Woodinville',          'Redmond',
    'Phoenix',        'Prosper',              'Marrero',
    'Irving',         'Samastipur',           'Westminster',
    'Puyallup',       'Tacoma',               'Bengaluru',
    'Edmonds',        'Federal Way',          'Chennai',
    'Dubai',          'Johannesburg',         'Perth',
    'Snohomish',      'Maple Valley',         'Montreal',
    'Mountain View',  'Lacolle',              'Issaquah',
    'Spring',         'Benoni',               'Queens Village',
    'Simsbury',       'Hyderabad',            'Boisar',
    'Novi',           'Malvern',              'Lakeville',
    'Ajax',           'Glastonbury',          'Markham',
    'Beloit',         'Sheboygan',            'Indianapolis',
    'St. Catharines', 'Pune',                 'Gainesville',
    'Minneapolis',    'Round Rock',           'Milwaukee',
    'Bolingbrook',    'Frisco',               'Plano',
    'Scottsdale',     'Miami',                'Sugar Land',
    'Houston',        'Austin',               'Randfontein',
    'Kirkland',       'North Richland Hills', 'Katy',
    'Walthamstow',    'Euless',               'Monahans',
    'Richardson',     'Lynnwood',             'Toronto',
    'McKinney',       'Cypress',              'Canton',
    'Keller',         'Missouri City',        'Wakefield',
    'Richmond',       'Dallas',               'Oklahoma City',
    'Visakhapatnam',  'San Jose',             'New Delhi',
    'Delhi',          'Tracy',                'Sweeny',
    'Dublin',         'Pleasanton',           'Scarborough',
    'Mississauga',    'Sunnyvale',            'Cumming',
    'Detroit',        'Skokie',               'Tucson',
    'Riyadh',         'Corpus Christi',       'Silver Spring',
    'Gilbert'
];
console.log(citiesOfClients);

app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log("Listening at port " + port));
app.use(express.json({limit : '5gb'}));

app.post('/client', (request, response) => {
    const city = request.body.location;
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