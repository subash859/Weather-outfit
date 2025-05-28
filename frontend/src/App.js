import { useState, useOptimistic } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherResult from "./components/WeatherResult";
import { getWeatherData, getOutfitSuggestion } from "./services/api";
import "./index.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Optimistic UI updates
  const [optimisticWeather, setOptimisticWeather] = useOptimistic(
    weather,
    (state, newCity) => ({
      ...state,
      name: newCity,
      isOptimistic: true
    })
  );

  const handleSearch = async (city) => {
    setError(null);
    setLoading(true);
    setOptimisticWeather(city);
    
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <WeatherForm onSearch={handleSearch} loading={loading} />
      {error && <div className="error-message">{error}</div>}
      <WeatherResult 
        weather={optimisticWeather} 
        outfit={outfit} 
        isLoading={loading} 
      />
    </div>
  );
};

export default App;

