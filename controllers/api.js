var config = require('../config/config.json');

var User = require('../models/User');

// API PROVIDERS SETUP
var foursquare = require('node-foursquare')({
  secrets: {
    clientId: config.foursquare.clientId,
    clientSecret: config.foursquare.clientSecret,
    redirectUrl: config.foursquare.callbackUrl
  }
});

var foursquareAccessToken = 'MY_FOURSQUARE_ACCESS_TOKEN';


exports.apiBrowser = function(req, res) {
  res.render('api');
};


exports.foursquare = function(req, res) {

  res.render('api/foursquare', {
    title: 'Foursquare API'
  });

};


/**
 * GET /auth/foursquare
 * Display Foursquare authentication screen
 */
exports.foursquareAuth = function(req, res) {
  res.writeHead(303, { location: foursquare.getAuthClientRedirectUrl() });
  res.end();
};

/**
 * GET /auth/foursquare/callback
 * Called when user presses Accept on the Foursquare authentication screen
 */
exports.foursquareCallback = function(req, res) {
  foursquare.getAccessToken({ code: req.query.code }, function(err, accessToken) {
    if (err) throw err;

    console.log(accessToken);
  });
};
