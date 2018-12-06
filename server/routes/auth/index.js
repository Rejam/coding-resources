const passport = require('passport');
const router = require('express').Router();

router.post('/login', passport.authenticate('auth0',
  { scope: 'openid email profile' }),
(req, res) => {
  console.log(res.user);
  // res.redirect('/');
});

router.post('/redirect', passport.authenticate('auth0'),
  (req, res) => {
    console.log(res.user);
    res.redirect('/');
  });

module.exports = router;
