const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true
  },
  dateOfEvent: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  },
});

module.exports = mongoose.model('Event', schema);
