var express = require('express')
var router = express.Router()
var users = require('../../../models').User
var locations = require('../../../models').FavoriteLocation
var DarkSkyService = require('../../../services/darksky_service').DarkSkyService
var GoogleGeocodingService = require('../../../services/google_geocode_service').GoogleGeocodingService

router.post('/', function(req, res, next) {
  var payload;
  users.findOne({where: {api_key: req.body.api_key}})
  .then(user => {
    if (user) {
      locations.create({
        userId: user.id,
        location: req.body.location
      })
      payload = {
        message: req.body.location + " has been added to your favorites"
      }
      res.status(200).send(payload)
    } else {
      payload = {
        message: "API key is invalid",
        status: 401
      }
      res.status(401).send(payload)
    }
  })
})

router.get('/', function(req, res, next) {
  let payload;
  users.findOne({where: {api_key: req.body.api_key}})
  .then(user => {
    locations.findAll({where: {userId: user.id}})
    .then(locations => {
      locations.forEach(function(element) {
        let google = new GoogleGeocodingService(element.location)
        return google.getCoordinates()
        .then(response => {
          let results = response.results[0]
          let location = results.formatted_address
          let coordinates = results.geometry.location.lat + ',' + results.geometry.location.lng
          let darksky = new DarkSkyService(coordinates)
          return darksky.getForecast()
          .then(response => {
            forecast = {
              location: location,
              currently: response.currently,
              hourly: response.hourly,
              daily: response.daily
            }
            console.log("FORECAST HERE")
            console.log(forecast)
            payload.push(forecast)
          })
        })
      })
      res.status(200).send(payload)
    })
  })
})

module.exports = router
