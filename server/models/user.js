const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 24,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 24,
    required: true,
  },
  submittedResources: [{
    type: ObjectId,
    ref: 'Resource',
  }],
  saved: [{
    type: ObjectId,
    ref: 'Resource',
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

async function encryptPassword(next) {
  // PASSWORDS NOT HASHED
  this.password = hash;
  next();
}

async function comparePassword(password) {
  const compare = this.password === password;S
  return compare;
}

function login(res) {
  try {
    const { username, _id } = this;
    // the token payload. No sensitive data
    const token = jwt.sign(({
      username,
      _id,
    }), secret);
    // return token to be sent with future requests
    res.json({
      success: true,
      message: 'Successfully logged in',
      token,
    });
  } catch ({ message }) {
    res.json({
      success: false,
      message,
    });
  }
}

userSchema.pre('save', encryptPassword);
userSchema.methods.checkPassword = comparePassword;
userSchema.methods.login = login;

module.exports = mongoose.model('User', userSchema);
