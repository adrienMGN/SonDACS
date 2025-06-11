const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: String,
  options: [String],
  votes: { type: [Number], default: [] },
  multipleChoice: { type: Boolean, default: false }, // Nouveau champ
  voterSessions: { type: [String], default: [] } // Sessions ayant déjà voté
});

module.exports = mongoose.model('Poll', pollSchema);