const { validationResult } = require('express-validator/check');
const User = require('../../models/user');

// Route functions
async function register(req, res) {
  try {
    const errors = validationResult(req).array();
    if (errors.length) res.status(422).json({ errors });
    else {
      const { username, email, password } = req.body;
      // input validated pre-save by User model and password hashed
      await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        success: true,
        message: 'Registration successful',
      });
    }
  } catch (errors) {
    res.status(400).json({
      success: false,
      errors,
    });
  }
}

async function login(req, res) {
  try {
    const errors = validationResult(req).array();
    if (errors.length) res.status(422).json({ errors });
    else {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      const pwIsValid = await user.checkPassword(password);

      // Password incorrect
      if (!pwIsValid) throw new Error('Password is incorrect').message;

      // Password correct
      user.login(res);
    }
  } catch (errors) {
    res.json({
      success: false,
      errors,
    });
  }
}

async function google(req, res) {
  res.send('Hello');
}

async function googleRedirect(req, res) {
  res.send('Hello');
}

module.exports = {
  register,
  login,
  google,
  googleRedirect,
};
