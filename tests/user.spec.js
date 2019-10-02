var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test POST /api/v1/users path', () => {
  test('should return a 200 status', () => {
    return request(app).post("/api/v1/users").then(response => {
      expect(response.status).toBe(201)
    });
  });
  test('should return an api_key on creation', () => {
    const user = {
      email: "billgates@gmail.com",
      password: "windows",
      password_confirmation: "windows"
    }
    return request(app).post("/api/v1/users").send(user).then(response => {
      expect(Object.keys(response.body)).toContain('api_key')
      })
    });
  });
});
