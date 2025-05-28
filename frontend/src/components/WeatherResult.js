import { Suspense } from 'react';
import clearIcon from "../assets/clear.png";
import cloudyIcon from "../assets/cloudy.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";

const getWeatherIcon = (description = '') => {
  if (description.includes("clear")) return clearIcon;
  if (description.includes("cloud")) return cloudyIcon;
  if (description.includes("rain")) return rainIcon;
  if (description.includes("snow")) return snowIcon;
  return clearIcon;
};

// Use emoji for outfit images
const getOutfitEmoji = (category) => {
  switch (category) {
    case "Winter": return "🧥❄️";
    case "Spring": return "🧥🌷";
    case "Summer": return "👕🌞";
    case "Hot": return "🩳🏖️"; // Changed from 👙🔥 to 🩳🏖️ (shorts and beach)
    default: return "👕";
  }
};

// Use emoji instead of images for accessories
const getAccessoryEmoji = (accessory) => {
  const accessoryLower = accessory.toLowerCase();
  if (accessoryLower.includes("sunglasses")) return "🕶️";
  if (accessoryLower.includes("umbrella")) return "☂️";
  if (accessoryLower.includes("scarf")) return "🧣";
  if (accessoryLower.includes("gloves")) return "🧤";
  if (accessoryLower.includes("hat") || accessoryLower.includes("beanie")) return "🧢";
  if (accessoryLower.includes("sunscreen")) return "🧴";
  if (accessoryLower.includes("windbreaker")) return "🧥";
  if (accessoryLower.includes("moisturizer")) return "💦";
  if (accessoryLower.includes("lip balm")) return "💄";
  if (accessoryLower.includes("water bottle")) return "🍶";
  return "👕";
};

const WeatherResult = ({ weather, outfit, isLoading }) => {
  if (!weather && !isLoading) return null;

  const isOptimistic = weather?.isOptimistic;
  const weatherIcon = weather?.weather?.[0]?.description 
    ? getWeatherIcon(weather.weather[0].description) 
    : clearIcon;
  const outfitEmoji = outfit ? getOutfitEmoji(outfit.season) : "";

  return (
    <div className={`result-container ${isLoading ? 'loading' : ''}`} 
         style={{ opacity: isOptimistic ? 0.7 : 1 }}>
      <Suspense fallback={<div className="loading-indicator">Loading weather data...</div>}>
        {weather && (
          <div className="weather-section">
            <h2>{weather.name}</h2>
            {!isOptimistic && (
              <>
                <img src={weatherIcon} alt="Weather" className="weather-icon" />
                <div className="weather-details">
                  <p className="weather-description">{weather.weather?.[0]?.description || 'Loading...'}</p>
                  <p>Temperature: {weather.main?.temp || '--'}°C</p>
                  <p>Humidity: {weather.main?.humidity || '--'}%</p>
                  <p>Wind Speed: {weather.wind?.speed || '--'} m/s</p>
                </div>
              </>
            )}
          </div>
        )}

        {outfit && !isOptimistic && (
          <div className="outfit-container">
            <h3>Recommended Outfit for {outfit.season} Weather</h3>
            <div className="outfit-emoji">{outfitEmoji}</div>
            <p className="outfit-suggestion">{outfit.suggestion}</p>
            
            {outfit.accessories && outfit.accessories.length > 0 && (
              <div className="accessories-container">
                <h4>Recommended Accessories</h4>
                <div className="accessories-grid">
                  {outfit.accessories.map((accessory, index) => {
                    const emoji = getAccessoryEmoji(accessory);
                    return (
                      <div key={index} className="accessory-item">
                        <span className="accessory-emoji">{emoji}</span>
                        <p>{accessory}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
        {isLoading && <div className="loading-overlay">Fetching data...</div>}
      </Suspense>
    </div>
  );
};

export default WeatherResult;
