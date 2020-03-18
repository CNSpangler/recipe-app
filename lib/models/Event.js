const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true
  },
  dateOfEvent: {
    type: new Date(),
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false,
    enum: [1, 2, 3, 4, 5]
  },
});

module.exports = mongoose.model('Event', schema);
