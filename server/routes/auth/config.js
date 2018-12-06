const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../../models/googleUser');

const authenticate = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] });
const authenticateRedirect = passport.authenticate('google', { successRedirect: '/auth/google/success', failureRedirect: '/auth/google/failure' });

// serialize mongodb user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize and return user by mongodb id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await GoogleUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

passport.use(new GoogleStrategy({
  clientID: '1095933944063-tgul5e019aku70bhgpc0pf19jskm2jtp.apps.googleusercontent.com',
  clientSecret: 'YW7YRUmfpRCjBMvCW2_oRB9c',
  callbackURL: 'http://localhost:5000/auth/google/redirect',
  passReqToCallback: true,
}, (a, b, c, profile, done) => {
  GoogleUser.findOne({ googleId: profile.id }, (err, user) => {
    let newUser = user;

    if (err) {
      return done(err);
    }

    if (!user) {
      newUser = GoogleUser.create({
        username: 'Marko',
        googleId: profile.id,
      });
    }

    return done(err, newUser);
  });
}));

module.exports = {
  authenticate,
  authenticateRedirect,
};
