const router = require('express').Router();
const checkJwt = require('../../auth')

router.post('/login', checkJwt, (req, res) => {
  console.log('logged in', req.user);
  res.status(200).send();
});

module.exports = router;
