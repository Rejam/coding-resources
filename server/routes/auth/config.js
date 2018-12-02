const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const authenticate = passport.authenticate('google', { scope: ['profile'] });
const authenticateRedirect = passport.authenticate('google');

passport.use(
  new GoogleStrategy({
    clientID: '1095933944063-tgul5e019aku70bhgpc0pf19jskm2jtp.apps.googleusercontent.com',
    clientSecret: 'YW7YRUmfpRCjBMvCW2_oRB9c',
    callbackURL: '/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile, done);
  }),
);

module.exports = {
  authenticate,
  authenticateRedirect,
};
