const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  // Exercise title
  title: {
    type: String,
    required: true,
  },
  // Exercise description
  description: {
    type: String,
    required: true,
  },

  // Exercise equipment required
  equipment: {
    type: [String],
    default: [],
  },
  // Exercise image URL
  image: {
    type: String,
  },
  // Exercise category (e.g., cardio, strength, flexibility)
  category: {
    type: String,
    required: true,
  },
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;

//
