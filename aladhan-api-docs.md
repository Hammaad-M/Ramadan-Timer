Prayer Times API - AlAdhan v1
A RESTful API to get islamic prayer times for a given day, month or year. The API has several endpoints to assist developers. All the endpoints return JSON and are available over http and https. Please note that prayer timings might not always match your local mosque or government authority. Their timings are likely tuned or adjusted. Please see https://aladhan.com/calculation-methods for more details.

API SERVER
 https://api.aladhan.com/v1
 https://aladhan.api.islamic.network/v1/
 https://aladhan.api.alislam.ru/v1/
SELECTED: https://api.aladhan.com/v1
Daily Prayer Times
Prayer times for a specific date
get /timings/{date}
Returns all prayer times for a specific date

REQUEST
PATH PARAMETERS
* date
string
01-01-2025
Specific gregorian date in DD-MM-YYYY format

Examples: 01-01-2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* latitude
string
51.5194682
Latitude coordinates of users location

Examples: 51.5194682
* longitude
string
-0.1360365
Longitude coordinates of users location

Examples: -0.1360365
method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns all prayer times for a specific date

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"timings": {
"Fajr": "06:03",
"Sunrise": "08:06",
"Dhuhr": "12:04",
"Asr": "13:44",
"Sunset": "16:03",
"Maghrib": "16:03",
"Isha": "17:59",
"Imsak": "05:53",
"Midnight": "00:04",
"Firstthird": "21:24",
"Lastthird": "02:45"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
}
Prayer times for an address
get /timingsByAddress/{date}
Returns all prayer times for an address on a specific date

REQUEST
PATH PARAMETERS
* date
string
01-01-2025
Specific gregorian date in DD-MM-YYYY format

Examples: 01-01-2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* address
string
Trafalgar Square, London, UK
Address of user location

Examples: Trafalgar Square, London, UK
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns all prayer times for the given address on specified date

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"timings": {
"Fajr": "06:03",
"Sunrise": "08:06",
"Dhuhr": "12:04",
"Asr": "13:44",
"Sunset": "16:03",
"Maghrib": "16:03",
"Isha": "17:59",
"Imsak": "05:53",
"Midnight": "00:04",
"Firstthird": "21:24",
"Lastthird": "02:45"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
}
Prayer times for a city on a specific date
get /timingsByCity/{date}
Returns all prayer times for a city on a specific date

REQUEST
PATH PARAMETERS
* date
string
01-01-2025
Specific gregorian date in DD-MM-YYYY format

Examples: 01-01-2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* city
string
London
Name of the city

Examples: London
* country
string
GB
A country name or 2 character alpha ISO 3166 code

Examples: GB
state
string
London
Name of the state

Examples: London
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns all prayer times for the given city and country on specified date

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"timings": {
"Fajr": "06:03",
"Sunrise": "08:06",
"Dhuhr": "12:04",
"Asr": "13:44",
"Sunset": "16:03",
"Maghrib": "16:03",
"Isha": "17:59",
"Imsak": "05:53",
"Midnight": "00:04",
"Firstthird": "21:24",
"Lastthird": "02:45"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
}
Next prayer time for a date
get /nextPrayer/{date}
Returns next prayer time for a specific date

REQUEST
PATH PARAMETERS
* date
string
01-01-2025
Specific gregorian date in DD-MM-YYYY format

Examples: 01-01-2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* latitude
string
51.5194682
Latitude coordinates of users location

Examples: 51.5194682
* longitude
string
-0.1360365
Longitude coordinates of users location

Examples: -0.1360365
method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns next prayer times for a specific date

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"timings": {
"Dhuhr": "12:04"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
}
Next prayer times for an address on the specific date
get /nextPrayerByAddress/{date}
Returns next prayer times for the given address on the specified date

REQUEST
PATH PARAMETERS
* date
string
01-01-2025
Specific gregorian date in DD-MM-YYYY format

Examples: 01-01-2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* address
string
Trafalgar Square, London, UK
Address of user location

Examples: Trafalgar Square, London, UK
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns next prayer times for an address on the specified date

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"timings": {
"Dhuhr": "12:04"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
}
Monthly Prayer Times Calendar
Prayer times for a Hijri month
get /hijriCalendar/{year}/{month}
Returns Prayer times for a requested Hijri month

REQUEST
PATH PARAMETERS
* year
integer
1446
Year as per the Hijri calendar

Examples: 1446
* month
integer
7
Month number as per the Hijri calendar

Examples: 7
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* latitude
string
51.5194682
Latitude coordinates of users location

Examples: 51.5194682
* longitude
string
-0.1360365
Longitude coordinates of users location

Examples: -0.1360365
method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times for a Hijri month

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Prayer times for a Gregorian month
get /calendar/{year}/{month}
Returns Prayer times for a Gregorian month

REQUEST
PATH PARAMETERS
* year
integer
2025
Year as per the Gregorian calendar

Examples: 2025
* month
integer
1
Month number as per the Gregorian calendar

Examples: 1
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* latitude
string
51.5194682
Latitude coordinates of users location

Examples: 51.5194682
* longitude
string
-0.1360365
Longitude coordinates of users location

Examples: -0.1360365
method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times for a Gregorian month

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Prayer times for a Hijri month for an address
get /hijriCalendarByAddress/{year}/{month}
Returns Prayer times for a Hijri month for an address

REQUEST
PATH PARAMETERS
* year
integer
1446
Year as per the Hijri calendar

Examples: 1446
* month
integer
7
Month number as per the Hijri calendar

Examples: 7
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* address
string
Trafalgar Square, London, UK
Address of user location

Examples: Trafalgar Square, London, UK
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times for a Hijri month for an address

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Prayer times for a Gregorian month for an address
get /calendarByAddress/{year}/{month}
Returns Prayer times for a Gregorian month for an address

REQUEST
PATH PARAMETERS
* year
integer
2025
Year as per the Gregorian calendar

Examples: 2025
* month
integer
1
Month number as per the Gregorian calendar

Examples: 1
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* address
string
Trafalgar Square, London, UK
Address of user location

Examples: Trafalgar Square, London, UK
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times for a Gregorian month for an address

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Prayer times for a Hijri month for a city and country
get /hijriCalendarByCity/{year}/{month}
Returns Prayer times a Hijri month for a city and country

REQUEST
PATH PARAMETERS
* year
integer
1446
Year as per the Hijri calendar

Examples: 1446
* month
integer
7
Month number as per the Hijri calendar

Examples: 7
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* city
string
London
Name of the city

Examples: London
* country
string
GB
A country name or 2 character alpha ISO 3166 code

Examples: GB
state
string
London
Name of the state

Examples: London
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times a Hijri month for a city and country

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Prayer times for a Gregorian month for a city and country
get /calendarByCity/{year}/{month}
Returns Prayer times a Gregorian month for a city and country

REQUEST
PATH PARAMETERS
* year
integer
2025
Year as per the Gregorian calendar

Examples: 2025
* month
integer
1
Month number as per the Gregorian calendar

Examples: 1
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* city
string
London
Name of the city

Examples: London
* country
string
GB
A country name or 2 character alpha ISO 3166 code

Examples: GB
state
string
London
Name of the state

Examples: London
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times a Gregorian year for a city and country

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Annual Prayer Times Calendar
Prayer times for a Hijri year
get /hijriCalendar/{year}
Returns Prayer times for a Hijri year

REQUEST
PATH PARAMETERS
* year
integer
1446
Year as per the Hijri calendar

Examples: 1446
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* latitude
string
51.5194682
Latitude coordinates of users location

Examples: 51.5194682
* longitude
string
-0.1360365
Longitude coordinates of users location

Examples: -0.1360365
method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times for a Hijri year

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"1": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"2": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"3": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"4": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"5": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"6": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"7": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"8": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"9": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"10": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"11": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"12": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
}
Prayer times for a Gregorian year
get /calendar/{year}
Returns Prayer times for a Gregorian year

REQUEST
PATH PARAMETERS
* year
integer
2025
Year as per the Gregorian calendar

Examples: 2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* latitude
string
51.5194682
Latitude coordinates of users location

Examples: 51.5194682
* longitude
string
-0.1360365
Longitude coordinates of users location

Examples: -0.1360365
method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times for a Gregorian year

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"1": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"2": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"3": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"4": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"5": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"6": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"7": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"8": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"9": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"10": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"11": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"12": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
}
Prayer times for a Hijri year for an address
get /hijriCalendarByAddress/{year}
Returns Prayer times for a Hijri year for an address

REQUEST
PATH PARAMETERS
* year
integer
1446
Year as per the Hijri calendar

Examples: 1446
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* address
string
Trafalgar Square, London, UK
Address of user location

Examples: Trafalgar Square, London, UK
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times for a Hijri year for an address

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"1": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"2": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"3": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"4": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"5": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"6": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"7": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"8": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"9": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"10": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"11": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"12": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
}
Prayer times for a Gregorian year for an address
get /calendarByAddress/{year}
Returns Prayer times for a Gregorian year for an address

REQUEST
PATH PARAMETERS
* year
integer
2025
Year as per the Gregorian calendar

Examples: 2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* address
string
Trafalgar Square, London, UK
Address of user location

Examples: Trafalgar Square, London, UK
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times for a Gregorian year for an address

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"1": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"2": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"3": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"4": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"5": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"6": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"7": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"8": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"9": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"10": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"11": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"12": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
}
Prayer times for a Hijri year for a city and country
get /hijriCalendarByCity/{year}
Returns Prayer times a Hijri year for a city and country

REQUEST
PATH PARAMETERS
* year
integer
1446
Year as per the Hijri calendar

Examples: 1446
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* city
string
London
Name of the city

Examples: London
* country
string
GB
A country name or 2 character alpha ISO 3166 code

Examples: GB
state
string
London
Name of the state

Examples: London
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times a Hijri year for a city and country

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"1": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"2": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"3": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"4": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"5": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"6": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"7": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"8": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"9": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"10": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"11": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"12": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
}
Prayer times for a Gregorian year for a city and country
get /calendarByCity/{year}
Returns Prayer times a Gregorian year for a city and country

REQUEST
PATH PARAMETERS
* year
integer
2025
Year as per the Gregorian calendar

Examples: 2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* city
string
London
Name of the city

Examples: London
* country
string
GB
A country name or 2 character alpha ISO 3166 code

Examples: GB
state
string
London
Name of the state

Examples: London
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer times a Gregorian year for a city and country

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"1": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"2": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"3": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"4": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"5": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"6": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"7": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"8": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"9": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"10": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"11": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
],
"12": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
}
Date Range Prayer Times Calendar
Prayer times calendar between 2 dates
get /calendar/from/{start}/to/{end}
Returns a prayer times calendar for a date range between a start date and end date with a maximum date range difference of 11 months

REQUEST
PATH PARAMETERS
* start
string
01-01-2025
Specific gregorian date in DD-MM-YYYY format

Examples: 01-01-2025
* end
string
01-02-2025
Specific gregorian date in DD-MM-YYYY format - must be no more than 11 months greater than the start date

Examples: 01-02-2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* latitude
string
51.5194682
Latitude coordinates of users location

Examples: 51.5194682
* longitude
string
-0.1360365
Longitude coordinates of users location

Examples: -0.1360365
method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer timings for the given date range between the start date and end date

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Prayer times calendar for an address between 2 dates
get /calendarByAddress/from/{start}/to/{end}
Returns a prayer times calendar for an address for a given date range between start date and end date with a maximum date range difference of 11 months

REQUEST
PATH PARAMETERS
* start
string
01-01-2025
Specific gregorian date in DD-MM-YYYY format

Examples: 01-01-2025
* end
string
01-02-2025
Specific gregorian date in DD-MM-YYYY format - must be no more than 11 months greater than the start date

Examples: 01-02-2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* address
string
Trafalgar Square, London, UK
Address of user location

Examples: Trafalgar Square, London, UK
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer timings for an address as per the given date range between start date and end date

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Prayer times calendar for a city for between 2 dates
get /calendarByCity/from/{start}/to/{end}
Returns a prayer times calendar for a city as for a given date range between start date and end date with a maximum date range difference of 11 months

REQUEST
PATH PARAMETERS
* start
string
01-01-2025
Specific gregorian date in DD-MM-YYYY format

Examples: 01-01-2025
* end
string
01-02-2025
Specific gregorian date in DD-MM-YYYY format - must be no more than 11 months greater than the start date

Examples: 01-02-2025
adjustment
integer
Only applicable if the calendar Method is set to MATHEMATICAL. Number of days to adjust the date being converted to. Example: 1 or 2 or -1 or -2

QUERY-STRING PARAMETERS
* city
string
London
Name of the city

Examples: London
* country
string
GB
A country name or 2 character alpha ISO 3166 code

Examples: GB
state
string
London
Name of the state

Examples: London
x7xapikey
string
7x API Key - An API key from https://7x.ax to geocode the address, city and country. If you do not provide one the response will mask the geocoded co-ordinates.

method
integer
3
Allowed: 0 ┃ 1 ┃ 2 ┃ 3 ┃ 4 ┃ 5 ┃ 6 ┃ 7 ┃ 8 ┃ 9 ┃ 10 ┃ 11 ┃ 12 ┃ 13 ┃ 14 ┃ 15 ┃ 16 ┃ 17 ┃ 18 ┃ 19 ┃ 20 ┃ 21 ┃ 22 ┃ 23 ┃ 99
A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. If not specified, it defaults to the closest authority based on the location or co-ordinates specified in the API call. This parameter accepts values from 0-23 and 99, as specified below:

Possible values:

0 - Jafari / Shia Ithna-Ashari
1 - University of Islamic Sciences, Karachi
2 - Islamic Society of North America
3 - Muslim World League
4 - Umm Al-Qura University, Makkah
5 - Egyptian General Authority of Survey
7 - Institute of Geophysics, University of Tehran
8 - Gulf Region
9 - Kuwait
10 - Qatar
11 - Majlis Ugama Islam Singapura, Singapore
12 - Union Organization islamic de France
13 - Diyanet İşleri Başkanlığı, Turkey
14 - Spiritual Administration of Muslims of Russia
15 - Moonsighting Committee Worldwide (also requires shafaq parameter)
16 - Dubai (experimental)
17 - Jabatan Kemajuan Islam Malaysia (JAKIM)
18 - Tunisia
19 - Algeria
20 - KEMENAG - Kementerian Agama Republik Indonesia
21 - Morocco
22 - Comunidade Islamica de Lisboa
23 - Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan
99 - Custom. See https://aladhan.com/calculation-methods
Examples: 3
shafaq
enum
general
Default: general
Allowed: general ┃ ahmer ┃ abyad
Which Shafaq to use if the 'method' query parameter is 'Moonsighting Commitee Worldwide'. Acceptable options are 'general', 'ahmer' and 'abyad'

Examples: general
tune
string
5,3,5,7,9,-1,0,8,-6
Comma Separated String of integers to offset timings returned by the API in minutes. The order is Imsak,Fajr,Sunrise,Dhuhr,Asr,Maghrib,Sunset,Isha,Midnight. See https://aladhan.com/calculation-methods for more details.

Examples: 5,3,5,7,9,-1,0,8,-6
school
integer
Default: 0
Allowed: 0 ┃ 1
Shafi (or the standard way) or Hanafi.

Possible values:

0 - Shafi
1 - Hanafi
midnightMode
integer
Default: 0
Allowed: 0 ┃ 1
Determines the method for calculating midnight

Possible values:

0 - Standard (Mid Sunset to Sunrise)
1 - Jafari (Mid Sunset to Fajr)
timezonestring
string
UTC
A valid timezone name as specified on https://php.net/manual/en/timezones.php.
If you do not specify this, we'll calculate it using the co-ordinates you provide.

Examples: UTC
latitudeAdjustmentMethod
integer
Allowed: 1 ┃ 2 ┃ 3
Method for adjusting times at higher latitudes. For example, if you are checking timings in the UK or Sweden.

Possible values:

1 - Middle of the Night
2 - One Seventh
3 - Angle Based
calendarMethod
enum
UAQ
Default: HJCoSA
Allowed: HJCoSA ┃ UAQ ┃ DIYANET ┃ MATHEMATICAL
A Calendar Calculation Method.
Defaults to HJCoSA.
- HJCoSA - High Judicial Council of Saudi Arabia (this is used on aladhan.com)
- UAQ - Umm al-Qura
- DIYANET - Diyanet İşleri Başkanlığı
- MATHEMATICAL

For more details on the methods, please see https://api.aladhan.com/v1/islamicCalendar/methods.

Examples: UAQ
iso8601
boolean
Default: false
Whether to return the prayer times in the iso8601 format. Example: true will return 2020-07-01T02:56:00+01:00 instead of 02:56

REQUEST HEADERS
Accept-Encoding
string
Content Encoding for compression. Supported values are "gzip" or "zstd".

API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
Returns Prayer timings for a city as per the given date range between start date and end date

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": [
{
"timings": {
"Fajr": "06:03 (UTC)",
"Sunrise": "08:06 (UTC)",
"Dhuhr": "12:04 (UTC)",
"Asr": "13:44 (UTC)",
"Sunset": "16:03 (UTC)",
"Maghrib": "16:03 (UTC)",
"Isha": "17:59 (UTC)",
"Imsak": "05:53 (UTC)",
"Midnight": "00:04 (UTC)",
"Firstthird": "21:24 (UTC)",
"Lastthird": "02:45 (UTC)"
},
"date": {
"readable": "01 Jan 2025",
"timestamp": "1735714800",
"hijri": {
"date": "01-07-1446",
"format": "DD-MM-YYYY",
"day": "1",
"weekday": {
"en": "Al Arba'a",
"ar": "الاربعاء"
},
"month": {
"number": 7,
"en": "Rajab",
"ar": "رَجَب",
"days": 30
},
"year": "1446",
"designation": {
"abbreviated": "AH",
"expanded": "Anno Hegirae"
},
"holidays": [
"Beginning of the holy months"
],
"adjustedHolidays": [ ],
"method": "HJCoSA"
},
"gregorian": {
"date": "01-01-2025",
"format": "DD-MM-YYYY",
"day": "01",
"weekday": {
"en": "Wednesday"
},
"month": {
"number": 1,
"en": "January"
},
"year": "2025",
"designation": {
"abbreviated": "AD",
"expanded": "Anno Domini"
},
"lunarSighting": false
}
},
"meta": {
"latitude": 51.5194682,
"longitude": -0.1360365,
"timezone": "UTC",
"method": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"latitudeAdjustmentMethod": "ANGLE_BASED",
"midnightMode": "STANDARD",
"school": "STANDARD",
"offset": {
"Imsak": 0,
"Fajr": 0,
"Sunrise": 0,
"Dhuhr": 0,
"Asr": 0,
"Sunset": 0,
"Maghrib": 0,
"Isha": 0,
"Midnight": 0
}
}
}
]
}
Prayer Time Methods
Prayer Times Methods
get /methods
Returns all the prayer times calculation methods supported by the AlAdhan API.

REQUEST
API Server
https://api.aladhan.com/v1
Authentication
Not Required
RESPONSE
200
Returns all the prayer times calculation methods & details

EXAMPLE
SCHEMA
application/json
Copy
{
"code": 200,
"status": "OK",
"data": {
"MWL": {
"id": 3,
"name": "Muslim World League",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 51.5194682,
"longitude": -0.1360365
}
},
"ISNA": {
"id": 2,
"name": "Islamic Society of North America (ISNA)",
"params": {
"Fajr": 15,
"Isha": 15
},
"location": {
"latitude": 39.7042123,
"longitude": -86.3994387
}
},
"EGYPT": {
"id": 5,
"name": "Egyptian General Authority of Survey",
"params": {
"Fajr": 19.5,
"Isha": 17.5
},
"location": {
"latitude": 30.0444196,
"longitude": 31.2357116
}
},
"MAKKAH": {
"id": 4,
"name": "Umm Al-Qura University, Makkah",
"params": {
"Fajr": 18.5,
"Isha": "90 min"
},
"location": {
"latitude": 21.3890824,
"longitude": 39.8579118
}
},
"KARACHI": {
"id": 1,
"name": "University of Islamic Sciences, Karachi",
"params": {
"Fajr": 18,
"Isha": 18
},
"location": {
"latitude": 24.8614622,
"longitude": 67.0099388
}
},
"TEHRAN": {
"id": 7,
"name": "Institute of Geophysics, University of Tehran",
"params": {
"Fajr": 17.7,
"Isha": 14,
"Maghrib": 4.5,
"Midnight": "JAFARI"
},
"location": {
"latitude": 35.6891975,
"longitude": 51.3889736
}
},
"JAFARI": {
"id": 0,
"name": "Shia Ithna-Ashari, Leva Institute, Qum",
"params": {
"Fajr": 16,
"Isha": 14,
"Maghrib": 4,
"Midnight": "JAFARI"
},
"location": {
"latitude": 34.6415764,
"longitude": 50.8746035
}
},
"GULF": {
"id": 8,
"name": "Gulf Region",
"params": {
"Fajr": 19.5,
"Isha": "90 min"
},
"location": {
"latitude": 24.1323638,
"longitude": 53.3199527
}
},
"KUWAIT": {
"id": 9,
"name": "Kuwait",
"params": {
"Fajr": 18,
"Isha": 17.5
},
"location": {
"latitude": 29.375859,
"longitude": 47.9774052
}
},
"QATAR": {
"id": 10,
"name": "Qatar",
"params": {
"Fajr": 18,
"Isha": "90 min"
},
"location": {
"latitude": 25.2854473,
"longitude": 51.5310398
}
},
"SINGAPORE": {
"id": 11,
"name": "Majlis Ugama Islam Singapura, Singapore",
"params": {
"Fajr": 20,
"Isha": 18
},
"location": {
"latitude": 1.352083,
"longitude": 103.819836
}
},
"FRANCE": {
"id": 12,
"name": "Union Organization Islamic de France",
"params": {
"Fajr": 12,
"Isha": 12
},
"location": {
"latitude": 48.856614,
"longitude": 2.3522219
}
},
"TURKEY": {
"id": 13,
"name": "Diyanet İşleri Başkanlığı, Turkey (experimental)",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 39.9333635,
"longitude": 32.8597419
}
},
"RUSSIA": {
"id": 14,
"name": "Spiritual Administration of Muslims of Russia",
"params": {
"Fajr": 16,
"Isha": 15
},
"location": {
"latitude": 54.734791,
"longitude": 55.9578555
}
},
"MOONSIGHTING": {
"id": 15,
"name": "Moonsighting Committee Worldwide (Moonsighting.com)",
"params": {
"shafaq": "general"
}
},
"DUBAI": {
"id": 16,
"name": "Dubai (experimental)",
"params": {
"Fajr": 18.2,
"Isha": 18.2
},
"location": {
"latitude": 25.0762677,
"longitude": 55.087404
}
},
"JAKIM": {
"id": 17,
"name": "Jabatan Kemajuan Islam Malaysia (JAKIM)",
"params": {
"Fajr": 20,
"Isha": 18
},
"location": {
"latitude": 3.139003,
"longitude": 101.686855
}
},
"TUNISIA": {
"id": 18,
"name": "Tunisia",
"params": {
"Fajr": 18,
"Isha": 18
},
"location": {
"latitude": 36.8064948,
"longitude": 10.1815316
}
},
"ALGERIA": {
"id": 19,
"name": "Algeria",
"params": {
"Fajr": 18,
"Isha": 17
},
"location": {
"latitude": 36.753768,
"longitude": 3.0587561
}
},
"KEMENAG": {
"id": 20,
"name": "Kementerian Agama Republik Indonesia",
"params": {
"Fajr": 20,
"Isha": 18
},
"location": {
"latitude": -6.2087634,
"longitude": 106.845599
}
},
"MOROCCO": {
"id": 21,
"name": "Morocco",
"params": {
"Fajr": 19,
"Isha": 17
},
"location": {
"latitude": 33.9715904,
"longitude": -6.8498129
}
},
"PORTUGAL": {
"id": 22,
"name": "Comunidade Islamica de Lisboa",
"params": {
"Fajr": 18,
"Maghrib": "3 min",
"Isha": "77 min"
},
"location": {
"latitude": 38.7222524,
"longitude": -9.1393366
}
},
"JORDAN": {
"id": 23,
"name": "Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan",
"params": {
"Fajr": 18,
"Maghrib": "5 min",
"Isha": 18
},
"location": {
"latitude": 31.9461222,
"longitude": 35.923844
}
},
"CUSTOM": {
"id": 99
}
}
}
Upcoming Holy Day
Close
Lailat-ul-Qadr on 10 March 2026
© 2013 - 2026 Islamic Network and respective contributors. Read the credits, terms and conditions for more in