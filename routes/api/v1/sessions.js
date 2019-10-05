var express = require('express')
var router = express.Router()
var users = require('../../../models').User
const bcrypt = require('bcrypt');

router.post('/', function(req, res, next) {
  var payload;
  users.findOne({where: {email: req.body.email}})
  .then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password_digest)) {
        res.status(200).send({api_key: user.api_key})
      } else {
        payload = {
          error: "Password is incorrect",
          status: 401
        }
        res.status(401).send(payload)
      }
    } else {
      payload = {
        error: "Email is incorrect or does not exist",
        status: 401
      }
      res.status(401).send(payload)
    }
  })
})

module.exports = router
