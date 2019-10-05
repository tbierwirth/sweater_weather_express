var request = require("supertest");
var app = require('../app');
var GoogleGeocodingService = require('../services/google_geocode_service').GoogleGeocodingService

describe('Google Geocoding Service', () => {
  it('retrieves lat/lng if given a city and state', () => {
    let address = "Denver, CO"
    let geocoding = new GoogleGeocodingService(address)

    return geocoding.getCoordinates()
    .then(response => {
      let results = response.results[0]
      expect(results.formatted_address).toEqual("Denver, CO, USA");
      expect(results.geometry.location.lat).toEqual(39.7392358);
      expect(results.geometry.location.lng).toEqual(-104.990251);
    })
  })
})
