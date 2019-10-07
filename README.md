# Sweater Weather Express
An API built out in Express (Node.js) that integrates with Google's Geocoding API and Darksky API.  Allows users to register with a POST request and receive an API key, which they can use to retrieve the forecast of a location.

## Endpoints
### HTTP Request: POST `/api/v1/users`
With parameters in the body, create a user.

| Parameter  | Description                                |
|------------|--------------------------------------------|
| email       | Must be unique        |
| password | Must match password_confirmation        |
| password_confirmation | Must match password        |
