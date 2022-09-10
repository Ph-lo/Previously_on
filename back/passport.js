const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
require("dotenv").config();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.betaseries.com/authorize',
    tokenURL: 'https://api.betaseries.com/oauth/access_token',
    client_id: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(err, user);
  }
));