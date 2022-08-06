const { mongoose } = require('mongoose');

const { Schema } = mongoose;

const Pet = new Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  category: { type: String, required: true },
  gender: String,
  owner: {
    _id: String,
    email: String,
    full_name: String,
    phone: String,
  },
  zip_code: String,
  state: String,
  location: [Number],
  breed: String,
  age: Number,
  size: Number,
  behaviors: String,
  images: [String],
  available: Boolean,
});

Pet.index({ location: '2d' });

module.exports = mongoose.model('Pet', Pet);
