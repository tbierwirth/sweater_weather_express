const fetch = require('cross-fetch');
class GoogleGeocodingService {
  constructor(address) {
    this.address = address
  }
  getCoordinates() {
    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json"),
    params = {address:this.address, key:process.env.GOOGLE_API_KEY}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url).then(response => response.json())
  }
}
module.exports = {GoogleGeocodingService: GoogleGeocodingService}
