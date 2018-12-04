const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GoogleUser = require('../../models/googleUser');

passport.serializeUser((user, done) => {
  done(user.id);
});

passport.deserializeUser((id, done) => {
  GoogleUser.findById(id).then((user) => {
    done(null, user.id);
  });
});

passport.use(new GoogleStrategy({
  clientID: '1095933944063-tgul5e019aku70bhgpc0pf19jskm2jtp.apps.googleusercontent.com',
  clientSecret: 'YW7YRUmfpRCjBMvCW2_oRB9c',
  callbackURL: 'http://localhost:5000/auth/google/redirect', // Maybe needs to be http://.... and cannotwork just on localhost
  passReqToCallback: true,
},
((request, accessToken, refreshToken, profile, done) => {
  GoogleUser.findOne({ googleId: profile.id }, (err, user) => {
    return done(err, user);
  });
})));

const { register, login } = require('./controller');
const { regValidation, loginValidation } = require('./validation');

router.post('/register', regValidation, register);
router.post('/login', loginValidation, login);

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }));

router.get('/google/redirect',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure',
  }));

module.exports = router;
