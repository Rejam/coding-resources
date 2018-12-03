const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const authenticate = passport.authenticate('google', { scope: ['profile'] });
const authenticateRedirect = passport.authenticate('google');

const GoogleUser = require('../../models/googleUser');

passport.serializeUser((user, done) => {
  done(user.id);
});

passport.deserializeUser((id, done) => {
  GoogleUser.findById(id).then((user) => {
    done(null, user.id);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: '1095933944063-tgul5e019aku70bhgpc0pf19jskm2jtp.apps.googleusercontent.com',
    clientSecret: 'YW7YRUmfpRCjBMvCW2_oRB9c',
    callbackURL: '/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    GoogleUser.findOne({ googleId: profile.id })
      .then((currentUser) => {
        if (!currentUser) {
          const user = new GoogleUser({
            username: profile.displayName,
            googleId: profile.id,
          });

          user.save();

          done(null, user);
        } else {
          done(null, currentUser);
        }
      });
  }),
);

module.exports = {
  authenticate,
  authenticateRedirect,
};
