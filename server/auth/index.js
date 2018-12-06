const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');

const auth0 = new Auth0Strategy({
  domain: 'rejam.eu.auth0.com',
  clientID: 'i5nd0pTgD658BmsbFDUa0CM7pB4WJsxA',
  clientSecret: 'ty8vKva2xkIz8A4zMwLuaaG4eqPXBdAYrprR7Y6t9G4Cpz_mlAoNo9aalE-ivXXB',
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/auth/redirect'
},
(acessToken, refreshToken, extraParams, profile, done) => {
  // accessToken is the token to call Auth0 API (not needed in the most cases)
  // extraParams.id_token has the JSON Web Token
  // profile has all the information from the user
  return done(null, profile);
});

passport.use(auth0);

const sessionOptions = {
  secret: 'coding resources session secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};
/*
if (app.get('env') === 'production') {
  // serve secure cookies, requires https
  sessionOptions.cookie.secure = true;
}
*/

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session(sessionOptions));
}