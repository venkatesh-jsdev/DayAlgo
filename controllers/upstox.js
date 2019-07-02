import config from '../config/upstox';
import { FNO_STOCKS, EQUITY_EXCHANGE } from '../config/config';
const Upstox = require("upstox");
const upstox = new Upstox(config.UPSTOX_API_KEY);
let accessToken;

var upstoxAPI = {};
upstoxAPI.upstoxGET = (req, res) => {
  const loginUrl = upstox.getLoginUri(config.UPSTOX_REDIRECTION);
  res.redirect(loginUrl);
};

upstoxAPI.AUTH_REDIRECT = (req, res) => {
  
  if(req.query.code) {
    const params =  {
      apiSecret : config.UPSTOX_API_SECRET,
      code : req.query.code,
      redirect_uri : config.UPSTOX_REDIRECTION
    };
  
    upstox.getAccessToken(params)
      .then(function(response) {
        accessToken = response.access_token;
        upstox.setToken(accessToken);
        start(req, res);
        //res.send({done: 'done'});
      })
      .catch(function(err) {
        // handle error
        console.log("Error", err);
        
        if(err.code === 401) {
          res.redirect('/api/login')
        }
      });
  }
  else {
    res.redirect('/api/login')
  }
  
  
};

function start(req, res){
 
  //const requests = FNO_STOCKS.map((tick) => upstox.getLiveFeed({exchange: EQUITY_EXCHANGE, symbol: tick, type:'ltp'}));
  const requests = FNO_STOCKS.map((tick) => upstox.getOHLC({exchange: EQUITY_EXCHANGE, symbol: tick, interval:'1'}));
  
  Promise.all(requests)
    .then((data) => {
      
      res.send(data);
      
    }).catch((error) => {
      
      res.send(error);
      
    });
  
};

module.exports = upstoxAPI;
