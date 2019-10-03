var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var users = require('../models').User

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

  describe('Test POST /api/v1/users path', () => {
    test('should return an api_key on creation', () => {
      const user = {
        email: "billgates@gmail.com",
        password: "windows",
        password_confirmation: "windows"
      }
      return request(app).post("/api/v1/users").send(user).then(response => {
        expect(Object.keys(response.body)).toContain('api_key')
        expect(response.status).toBe(201)
        })
      });
    test('should not create an account if passwords dont match', () => {
      const user = {
        email: "billgates@gmail.com",
        password: "windows",
        password_confirmation: "window"
      }
      return request(app).post("/api/v1/users").send(user).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toContain('Passwords do not match')
      })
    })
    test('should not create an account if email is taken', () => {
      users.create({
        email: "billgates@gmail.com",
        password_digest: "password",
        api_key: "smi123o4ml124"
      })
      const user = {
        email: "billgates@gmail.com",
        password: "windows",
        password_confirmation: "windows"
      }
      return request(app).post("/api/v1/users").send(user).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toContain('Email has been taken')
      })
    })
  });
});
