const router = require('express').Router();

const { register, login, google, googleRedirect } = require('./controller');
const { regValidation, loginValidation } = require('./validation');
const { authenticate, authenticateRedirect } = require('./config');

router.post('/register', regValidation, register);
router.post('/login', loginValidation, login);

router.get('/google', authenticate, google);
router.get('/google/redirect', authenticateRedirect, googleRedirect);

module.exports = router;
