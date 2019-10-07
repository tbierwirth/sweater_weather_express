# Sweater Weather Express
An API built out in Express (Node.js) that integrates with Google's Geocoding API and Darksky API.  Allows users to register with a POST request and receive an API key, which they can use to retrieve the forecast of a location.

## Setup
- Run `npm install` to install packages.
- Run `npx sequelize db:create` and then `npx sequelize db:migrate` to create and migrate the database.

## Endpoints
### POST `/api/v1/users`
With parameters in the body, create a user.  Responds with a unique API key.

| Body  | Description                                |
|------------|--------------------------------------------|
| email       | Must be unique        |
| password | Must match password_confirmation        |
| password_confirmation | Must match password        |

Example Request:
```
POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```

Example Response: 
```
status: 201
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

### POST `/api/v1/sessions`
With parameters in the body, login to receive your API key.

Example Request: 
```
POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
}
```

Example Response:
```
status: 200
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

### GET `/api/v1/forecast`
With API key in the body, retrieve a forecast for a location.

| Parameter  | Description                                |
|------------|--------------------------------------------|
| location       | City/State        |

Example Request:
```
GET /api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

Example Response:
```
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```
## Schema Design
![schema](https://i.imgur.com/4SAknRo.png)
