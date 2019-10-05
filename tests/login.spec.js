var shell = require("shelljs");
var request = require("supertest");
var app = require('../app');
const users = require("../models").User

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });

  describe('Test POST /api/v1/sessions path', () => {
    test('should return an api_key on login', () => {
      const login = {
        email: "test@gmail.com",
        password: "p@ssword",
      }
      return request(app).post("/api/v1/sessions").send(login).then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body)).toContain('api_key');
      })
    })

    test('should not respond with api_key if password is incorrect', () => {
      const login = {
        email: "billgates@gmail.com",
        password: "password",
      };
      return request(app).post("/api/v1/sessions").send(login).then(response => {
        expect(response.status).toBe(401)
        expect(response.body.error).toBe('Password is incorrect')
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
