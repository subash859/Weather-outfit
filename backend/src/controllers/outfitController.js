const { predictOutfit } = require("../services/mlService");

const suggestOutfit = async (req, res) => {
  try {
    const { temp, humidity, wind_speed } = req.query;

    if (!temp || !humidity || !wind_speed) {
      return res.status(400).json({ error: "Temperature, humidity, and wind speed are required" });
    }

    const outfitData = await predictOutfit(temp, humidity, wind_speed);
    
    res.json({
      temperature: parseFloat(temp),
      humidity: parseFloat(humidity),
      wind_speed: parseFloat(wind_speed),
      season: outfitData.season,
      suggestion: outfitData.outfit,
      accessories: outfitData.accessories
    });
  } catch (error) {
    console.error("ML prediction error:", error);
    res.status(500).json({ error: "ML prediction failed", details: error.toString() });
  }
};

module.exports = { suggestOutfit };
