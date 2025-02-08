const axios = require("axios");
const { WEATHER_API_KEY, WEATHER_API_URL } = require("../config/env");

const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${WEATHER_API_URL}`, {
      params: { q: city, appid: WEATHER_API_KEY, units: "metric" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

module.exports = { fetchWeatherData };
