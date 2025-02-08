import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/weather`, { params: { city } });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data.");
  }
};

export const getOutfitSuggestion = async (temp, humidity, windSpeed) => {
  try {
    const response = await axios.get(`${API_URL}/outfit`, {
      params: { temp, humidity, wind_speed: windSpeed },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch outfit suggestion.");
  }
};
