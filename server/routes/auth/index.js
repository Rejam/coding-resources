const router = require('express').Router();

const { register, login } = require('./controller');
const { regValidation, loginValidation } = require('./validation');
const { authenticate, authenticateRedirect } = require('./config');

router.post('/register', regValidation, register);
router.post('/login', loginValidation, login);

router.get('/google', authenticate);
router.get('/google/redirect', authenticateRedirect);

module.exports = router;
