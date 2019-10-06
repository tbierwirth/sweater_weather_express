var shell = require("shelljs");
var request = require("supertest");
var app = require('../app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
    shell.exec('npx sequelize db:migrate --env test')
    shell.exec('npx sequelize db:seed:all --env test')
  });

  afterAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
    });


  describe('Test POST /api/v1/favorites path', () => {
    test('should create a favorite location record for a user', () => {
      const location = {
        location: "Denver, CO",
        api_key: "KH5YFF2-7MF4N5P-G2DTVFM-JHRH89B"
      }
      return request(app).post("/api/v1/favorites").send(location).then(response => {
        expect(response.status).toBe(200)
        expect(response.body.message).toContain('Denver, CO has been added to your favorites')
        })
      });

    test('should not create a a favorite if api_key doesnt exist', () => {
      const location = {
        location: "Denver, CO",
        api_key: "H5YFF2-7MF4N5P-G2DTVFM-JHRH89"
      }
      return request(app).post("/api/v1/favorites").send(location).then(response => {
        expect(response.status).toBe(401)
        expect(response.body.message).toContain('API key is invalid')
        })
    })
  });
});
