# Sweater Weather Express
An API built out in Express (Node.js) that integrates with Google's Geocoding API and Darksky API.  Allows users to register with a POST request and receive an API key, which they can use to retrieve the forecast of a location.

## Endpoints
### POST `/api/v1/users`
With parameters in the body, create a user.  Responds with a unique API key.

| Parameter  | Description                                |
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
