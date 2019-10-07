var express = require('express')
var router = express.Router()
var users = require('../../../models').User
var DarkSkyService = require('../../../services/darksky_service').DarkSkyService
var GoogleGeocodingService = require('../../../services/google_geocode_service').GoogleGeocodingService

router.get('/', function(req, res, next) {
  var payload;
  users.findOne({where: {api_key: req.body.api_key}})
  .then(user => {
    if (user) {
      let google = new GoogleGeocodingService(req.query.location)
      return google.getCoordinates()
      .then(response => {
        let results = response.results[0]
        var location = results.formatted_address
        var coordinates = results.geometry.location.lat + ',' + results.geometry.location.lng
        let darksky = new DarkSkyService(coordinates)
        return darksky.getForecast()
        .then(response => {
          forecast = {
            location: location,
            currently: response.currently,
            hourly: response.hourly,
            daily: response.daily
          }
          res.status(200).send(forecast)
        })
      })
    } else {
      payload = {
        error: "API key is not valid",
        status: 401
      }
      res.status(401).send(payload)
    }
  })
  .catch(error => {
    payload = {
      error: "API key is not valid",
      status: 401
    }
    res.status(401).send(payload)
  })
})

module.exports = router
