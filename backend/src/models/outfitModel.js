const mongoose = require("mongoose");

const outfitSchema = new mongoose.Schema({
  temperatureRange: { type: String, required: true },
  recommendation: { type: String, required: true },
});

const Outfit = mongoose.model("Outfit", outfitSchema);

module.exports = Outfit;
