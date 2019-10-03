var express = require('express')
var router = express.Router()

var users = require('../../../models').User
const bcrypt = require('bcrypt');

router.post('/', function(req, res, next) {
  users.findOne({where: {email: req.body.email}})
  .then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password_digest) == true) {
        api_key = {
          api_key: user.api_key
        }
        res.status(200).send(api_key)
      } else {
        payload = {
          error: "Password is incorrect",
          status: 401
        }
        res.status(401).send(JSON.stringify(payload))
      }
    } else {
      payload = {
        error: "Email is incorrect or does not exist",
        status: 400
      }
      res.status(400).send(JSON.stringify(payload))
    }
  })
})

// router.post('/', function(req, res, next) {
//   users.findOne({where: {email: req.body.email}})
//   .then(user => {
//     if (user) {
//       bcrypt.compare(req.body.password, user.password_digest, function(err, res) {
//         if (res == true) {
//           api_key = {
//             api_key: user.api_key
//           }
//           res.status(200).send(api_key)
//         } else {
//           payload = {
//             error: "Password is incorrect",
//             status: 401
//           }
//           res.status(401).send(JSON.stringify(payload))
//         }
//       })
//     } else {
//       payload = {
//         error: "Email is incorrect or does not exist",
//         status: 400
//       }
//       res.status(400).send(JSON.stringify(payload))
//     }
//   })
// })

module.exports = router
