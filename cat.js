const axios = require("axios");
const baseURL = "https://api.thecatapi.com/v1/images/search";

async function getCatPhoto() {
  let response = await axios.get(baseURL);
  const photourl = response.data[0].url
  return photourl;
}

module.exports = getCatPhoto;
