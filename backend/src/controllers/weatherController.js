const axios = require("axios");
const { WEATHER_API_KEY, WEATHER_API_URL } = require("../config/env");

const getWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const response = await axios.get(`${WEATHER_API_URL}`, {
      params: { q: city, appid: WEATHER_API_KEY, units: "metric" },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = { getWeather };
