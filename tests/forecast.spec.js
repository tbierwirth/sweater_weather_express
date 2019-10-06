var shell = require("shelljs");
var request = require("supertest");
var app = require('../app');
const users = require("../models").User

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
    shell.exec('npx sequelize db:migrate --env test')
    shell.exec('npx sequelize db:seed:all --env test')
  });

  afterAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
    });

  describe('Test GET /api/v1/forecast path', () => {
    test('should return a forecast if given a valid api_key', () => {
      const key = {
        api_key: "KH5YFF2-7MF4N5P-G2DTVFM-JHRH89B"
      }
      return request(app).get("/api/v1/forecast?location=denver,co").send(key).then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body)).toContain('currently');
        expect(Object.keys(response.body)).toContain('hourly');
        expect(Object.keys(response.body)).toContain('daily');
      })
    })

    test('should not respond with forecast if api_key is invalid', () => {
      const key = {
        api_key: "KH5Y2-7MFN5P-G2DVFM-JHRH"
      };
      return request(app).get("/api/v1/forecast?location=denver,co").send(key).then(response => {
        expect(response.status).toBe(401)
        expect(response.body.error).toBe('API key is not valid')
      })
    })

    test('should not respond with forecast if no api_key is sent', () => {
      return request(app).get("/api/v1/forecast?location=denver,co").then(response => {
        expect(response.status).toBe(401)
        expect(response.body.error).toBe('API key is not valid')
      })
    })
  });
});
