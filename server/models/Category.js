const mongoose = require('mongose');
const { Schema } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
