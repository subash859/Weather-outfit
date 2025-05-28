const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  condition: String,
  suggestion: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Outfit', outfitSchema);

