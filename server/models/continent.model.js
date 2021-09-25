const mongoose = require('mongoose');

const continentSchema = new mongoose.Schema({
  code: String,
  name: String,
});

module.exports = mongoose.model('Continent', continentSchema);
