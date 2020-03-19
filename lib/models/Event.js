const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  dateOfEvent: {
    type: Date,
    required: true
  },
  notes: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

schema.virtual('day')
  .get(function() {
    return this.day;
  })
  .set(function() {
    const date = new Date().toUTCString();
    const dateArray = date.split(',');
    return dateArray[0];
  });

// schema.virtual('month')
// .get(function() {
//   return this.day
// .set(function(val) {
//   const date = new Date().toUTCString();
//   const dateArray = date.split('');
//   return dateArray[];
// });

// schema.virtual('year')
//   .get(function() {
//     return this.year
//   .set(function(val));
// });

module.exports = mongoose.model('Event', schema);
