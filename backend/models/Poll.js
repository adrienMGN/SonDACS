const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: String,
  options: [String],
  votes: { type: [Number], default: [] },
});

module.exports = mongoose.model('Poll', pollSchema);