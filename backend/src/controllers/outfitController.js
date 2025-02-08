const { predictOutfit } = require("../services/mlService");

const suggestOutfit = async (req, res) => {
  try {
    const { temp, humidity, wind_speed } = req.query;

    if (!temp || !humidity || !wind_speed) {
      return res.status(400).json({ error: "Temperature, humidity, and wind speed are required" });
    }

    const outfit = await predictOutfit(temp, humidity, wind_speed);
    res.json({ temperature: temp, humidity, wind_speed, suggestion: outfit });
  } catch (error) {
    res.status(500).json({ error: "ML prediction failed" });
  }
};

module.exports = { suggestOutfit };
