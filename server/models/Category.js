const { Schema, model } = require('mongoose');

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

const Category = model('Category', categorySchema);

module.exports = Category;
