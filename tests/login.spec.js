var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var users = require('../models').User
const bcrypt = require('bcrypt');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate --env test')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test POST /api/v1/sessions path', () => {
    test('should return an api_key on login', () => {
      var hash = bcrypt.hashSync("password", 10);
      users.create({
        email: "billgates@gmail.com",
        password_digest: hash,
        api_key: "smi123o4ml124"
      })
      .then(user => {
        const login = {
          email: "billgates@gmail.com",
          password: "password",
        }
        return request(app).post("/api/v1/sessions").send(login).then(response => {
          expect(response.status).toBe(200)
          expect(response.body.api_key).toBe('smi123o4ml124')
        })
      });
    })

    test('should not respond with api_key if password is incorrect', () => {
      users.create({
        email: "billgates@gmail.com",
        password_digest: "windows",
        api_key: "smi123o4ml124"
      })
      .then(user => {
        const login = {
          email: "billgates@gmail.com",
          password: "password",
        };
        return request(app).post("/api/v1/sessions").send(login).then(response => {
          expect(response.status).toBe(401)
          expect(response.body.error).toBe('Password is incorrect')
        })
      })
    })
    test ('should not respond with api_key if email doesnt exist', () => {
      const login = {
        email: "billy@gmail.com",
        password: "password",
      };
      return request(app).post("/api/v1/sessions").send(login).then(response => {
        expect(response.status).toBe(401)
        expect(response.body.error).toBe('Email is incorrect or does not exist')
      })
    })
  });
});
