const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  code: String,
  native: String,
  phone: String,
  capital: String,
  currency: String,
  continentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'continents'
  },
  languages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'languages'
  }],
});

module.exports = mongoose.model('Book', bookSchema);
