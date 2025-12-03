const axios = require("axios");
const baseURL =
  "your_api_key";

async function getWeather(ctx) {
  let latitude = ctx.message.location.latitude;
  let longitude = ctx.message.location.longitude;
  const response = await axios.get(`${baseURL}${latitude},${longitude}`);
  const weather = response.data;
  return weather;
}

module.exports = getWeather;
