const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const googleUserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 24,
    required: true,
  },
  googleId: { type: String },
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

module.exports = mongoose.model('GoogleUser', googleUserSchema);
