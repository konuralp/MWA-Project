const { mongoose } = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  email: { type: String, required: true },
  full_name: String,
  password: { type: String, required: true },
  phone_number: String,
});

module.exports = mongoose.model('User', User);
