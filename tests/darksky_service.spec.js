var request = require("supertest");
var app = require('../app');
var DarkSkyService = require('../services/darksky_service').DarkSkyService

describe('DarkSky Service', () => {
  it('retrieves forecast if given lat/lng', () => {
    let coordinates = "39.7392358,-104.990251"
    let darksky = new DarkSkyService(coordinates)

    return darksky.getForecast()
    .then(response => {
      expect(Object.keys(response)).toContain('currently')
      expect(Object.keys(response)).toContain('daily')
      expect(Object.keys(response)).toContain('hourly')
    })
  })
})
