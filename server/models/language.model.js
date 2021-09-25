const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  code: String,
  name: String,
  native: String,
  rtf: String,
});

module.exports = mongoose.model('Language', languageSchema);
