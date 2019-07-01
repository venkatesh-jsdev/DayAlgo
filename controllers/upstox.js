import config from  '../config';
const Upstox = require("upstox");
const upstox = new Upstox(config.UPSTOX_API_KEY);


var upstoxAPI = {};
upstoxAPI.upstoxGET = (req, res) => {
  const loginUrl = upstox.getLoginUri(config.UPSTOX_REDIRECTION);
  res.redirect(loginUrl);
};

module.exports = upstoxAPI;
