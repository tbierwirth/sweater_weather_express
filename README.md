# Sweater Weather Express
An API built out in Express (Node.js) that integrates with Google's Geocoding API and Darksky API.  Allows users to register with a POST request and receive an API key, which they can use to retrieve the forecast of a location.

## Setup
### Initial Setup
- Run `npm install` to install packages.
- Run `npx sequelize db:create` and then `npx sequelize db:migrate` to create and migrate the database.
- Edit username/password fields in `config/config.json` to reflect your Postgres username on your machine.
- Create a `.env` file in the root project directory to contain your API keys in the following format:
```
GOOGLE_API_KEY=
DARKSKY_API_KEY=
```

### Server
- Run `npm start` and connect on http://localhost:3000

### Testing
- Run `npm test`

## Endpoints
### POST `/api/v1/users`
Create an account and receive an API key

| Body Params | Description                                |
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
Login to retrieve your API key
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
Retrieve forecast for a location (Ex. Denver, CO)

| Query Params  | Description                                |
|------------|--------------------------------------------|
| location       | City/State        |

| Body Params  | Description                                |
|------------|--------------------------------------------|
| api_key       | Your unique API key        |

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
### POST `api/v1/favorites`
Add favorite location to your account

Example Request:
```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

Example Response:
```
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
```

## Schema Design
![schema](https://i.imgur.com/4SAknRo.png)

## Tech Stack
- Express
- Javascript
- Sequelize (5.19.1)
- Postgres (7.12.1)
- Jest (24.9.0)

## How To Contribute
If you would like to contribute, take a look at current open issues and make a pull request with your contribution.
