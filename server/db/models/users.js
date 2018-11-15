const mongoose = require('mongoose');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

const Users = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: [5, 'Must be at least 5 characters'],
    maxlength: [24, 'Must be under 25 characters'],
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    minlength: [6, 'Must be at least 6 characters'],
    maxlength: [24, 'Must be under 25 characters'],
    required: [true, 'Password is required'],
  },
  links: {
    type: Array,
    default: [],
  },
  saved: {
    type: Array,
    default: [],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

async function encryptPassword(next) {
  const hash = await argon2.hash(this.password);
  this.password = hash;
  next();
}

async function comparePassword(password) {
  const compare = await argon2.verify(this.password, password);
  return compare;
}

function login() {
  const { username, email, _id } = this;
  const token = jwt.sign(({
    username,
    email,
    _id,
  }), secret);
  return {
    success: true,
    message: 'Successfully logged in',
    token,
  };
}

Users.pre('save', encryptPassword);
Users.methods.checkPassword = comparePassword;
Users.methods.login = login;

module.exports = mongoose.model('users', Users);
