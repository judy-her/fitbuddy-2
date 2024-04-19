const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bodyPart: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  gifUrl: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String],
  },
  secondaryMuscles: {
    type: [String],
  },
  target: {
    type: String,
    required: true,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;