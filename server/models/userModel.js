const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    validate: [validator.isEthereumAddress, 'not an eth address'],
    required: true,
    unique: true,
  },
  ratingsAverage: {
    type: Number,
    min: 1,
    max: 5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
