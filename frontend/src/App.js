import { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherResult from "./components/WeatherResult";
import { getWeatherData, getOutfitSuggestion } from "./services/api";
import "./index.css";

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
    <div>
      <WeatherForm onSearch={handleSearch} />
      <WeatherResult weather={weather} outfit={outfit} />
    </div>
  );
};

export default App;
