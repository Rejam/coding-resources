const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const auth0 = new Auth0Strategy({
  domain: 'rejam.eu.auth0.com',
  clientID: 'i5nd0pTgD658BmsbFDUa0CM7pB4WJsxA',
  clientSecret: 'DHH38Kfuak-YYIwh6UX6uSYzCNWNusVHGeZpER614x8vcuIYBQ-UNuT0GlwFSoF1',
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/auth/redirect',
},
(acessToken, refreshToken, profile, done) => {
  return done(null, profile);
});

passport.use(auth0);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
}