var shell = require("shelljs");
var request = require("supertest");
var app = require('../app');
const locations = require("../models").FavoriteLocation
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
      })

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
  })

  describe('Test GET /api/v1/favorites', () =>  {
    test('should return a users favorite locations', () => {
      return users.create({
        email: 'tyler@gmail.com',
        password_digest: "t23t23t32t23t23",
        api_key: 'this-is-my-key'
      })
      .then(user => {
        return locations.bulkCreate([
          { location: "Denver, CO", userId: user.id},
          { location: "Topeka, KS", userId: user.id}
        ])
        .then(locations => {
          const key = {
            api_key: 'this-is-my-key'
          }
          return request(app).get("/api/v1/favorites").send(key).then(response => {
            expect(response.status).toBe(200)
          })
        })
      })
    })
  })
})
