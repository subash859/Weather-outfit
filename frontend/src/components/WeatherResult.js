import clearIcon from "../assets/clear.png";
import cloudyIcon from "../assets/cloudy.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import winterOutfit from "../assets/winter.png";
import springOutfit from "../assets/spring.png";
import summerOutfit from "../assets/summer.png";
import hotOutfit from "../assets/hot.png";

const getWeatherIcon = (description) => {
  if (description.includes("clear")) return clearIcon;
  if (description.includes("cloud")) return cloudyIcon;
  if (description.includes("rain")) return rainIcon;
  if (description.includes("snow")) return snowIcon;
  return clearIcon;
};

const getOutfitImage = (category) => {
  switch (category) {
    case "Winter":
      return winterOutfit;
    case "Spring":
      return springOutfit;
    case "Summer":
      return summerOutfit;
    case "Hot":
      return hotOutfit;
    default:
      return summerOutfit;
  }
};

const WeatherResult = ({ weather, outfit }) => {
  if (!weather) return null;

  const weatherIcon = getWeatherIcon(weather.weather[0].description);
  const outfitImage = outfit ? getOutfitImage(outfit.suggestion) : null;

  return (
    <div className="container">
      <h2>{weather.name}</h2>
      <img src={weatherIcon} alt="Weather" className="weather-icon" />
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>

      {outfit && (
        <div className="outfit-container">
          <h3>Recommended Outfit:</h3>
          <img src={outfitImage} alt="Outfit" className="outfit-image" />
          <p>{outfit.suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherResult;
