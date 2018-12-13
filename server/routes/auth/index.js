const passport = require('passport');
const router = require('express').Router();

router.get('/login',
  passport.authenticate('auth0', { session: false }));

router.post('/redirect', passport.authenticate('auth0', { session: false }), (req, res) => {
  console.log('/routes/auth/redirect');
  res.send('redirected');
});

module.exports = router;
