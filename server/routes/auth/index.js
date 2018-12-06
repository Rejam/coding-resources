const router = require('express').Router();

const { register, login } = require('./controller');
const { regValidation, loginValidation } = require('./validation');
const { authenticate, authenticateRedirect } = require('./config');

router.post('/register', regValidation, register);
router.post('/login', loginValidation, login);

router.get('/google', authenticate);
router.get('/google/redirect', authenticateRedirect);

router.get('/google/failure', (req, res) => {
  res.send('Failure');
});

router.get('/google/success', (req, res) => {
  res.send('Success');
});

module.exports = router;
