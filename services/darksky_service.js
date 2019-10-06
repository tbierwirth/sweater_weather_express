const fetch = require('cross-fetch');
class DarkSkyService {
  constructor(coordinates) {
    this.coordinates = coordinates
  }
  getForecast() {
    const url = new URL("https://api.darksky.net/forecast/" + process.env.DARKSKY_API_KEY + '/' + this.coordinates)
    return fetch(url).then(response => response.json())
  }
}
module.exports = {DarkSkyService: DarkSkyService}
