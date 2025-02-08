import { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherResult from "./components/WeatherResult";
import { getWeatherData, getOutfitSuggestion } from "./services/api";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [outfit, setOutfit] = useState(null);

  const handleSearch = async (city) => {
    try {
      const weatherData = await getWeatherData(city);
      setWeather(weatherData);

      const outfitData = await getOutfitSuggestion(
        weatherData.main.temp,
        weatherData.main.humidity,
        weatherData.wind.speed
      );

      setOutfit(outfitData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Weather-Based Outfit Suggestion</h1>
      <WeatherForm onSearch={handleSearch} />
      <WeatherResult weather={weather} outfit={outfit} />
    </div>
  );
};

export default App;
