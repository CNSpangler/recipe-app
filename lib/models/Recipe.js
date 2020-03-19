const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  measurement: {
    type: String,
    required: true,
    enum: ['teaspoon', 'tablespoon', 'cup', 'ounce', 'grams']
  },
  name: {
    type: String,
    required: true
  }
});

schema.virtual('events', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: '_id'
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [ingredientSchema],
  directions: [String]
});

module.exports = mongoose.model('Recipe', schema);
