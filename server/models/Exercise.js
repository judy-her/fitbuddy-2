const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const exerciseSchema = new Schema({
  // Exercise title
  title: {
    type: String,
    required: true,
  },
  // Exercise instructions
  instructions: [
    {
      type: String
    }
  ],
  exerciseId: {
    type: String,
    required: true
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
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;