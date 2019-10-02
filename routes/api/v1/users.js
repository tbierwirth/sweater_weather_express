var express = require('express')
var router = express.Router()

var users = require('../../../models').User
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidAPIKey = require('uuid-apikey');

router.post('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json")

  if (req.body.password != req.body.password_confirmation) {
    payload = {
      error: "Passwords do not match",
      status: 400
    }
    res.status(400).send(JSON.stringify(payload))
  } else {
    users.findOne({where: {email: req.body.email}})
    .then(user => {
      if (user) {
        payload = {
          error: "Email has been taken",
          status: 400
        }
        res.status(400).send(JSON.stringify(payload))
      } else {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          users.create({
            email: req.body.email,
            password_digest: hash,
            api_key: uuidAPIKey.create().apiKey
          })
          .then(user => {
            api_key = {
              api_key: user.api_key
            }
            res.status(201).send(api_key)
          })
          .catch(error => {
            console.log(error)
            res.status(500).send({ error })
          })
        })
      }
    })
  }
})

module.exports = router
