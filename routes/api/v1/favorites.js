var express = require('express')
var router = express.Router()
var users = require('../../../models').User
var locations = require('../../../models').FavoriteLocation

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

module.exports = router
