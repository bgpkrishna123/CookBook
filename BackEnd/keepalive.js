const axios = require("axios");
let url = process.env.DEPLOYED_URL;
async function keepAlive() {
  setInterval(async () => {
    try {
      await axios.get(url + "/recipes");
    } catch (error) {
      console.log(error);
    }
    console.log("keepAlive");
  }, 1000 * 60 * 2);
}

module.exports = { keepAlive };
