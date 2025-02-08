const WeatherResult = ({ weather, outfit }) => {
    if (!weather || !weather.main || !weather.wind) return null;
  
    return (
      <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold">Weather in {weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
  
        {outfit && (
          <div className="mt-4 p-2 bg-green-100 rounded">
            <h3 className="text-lg font-bold">Recommended Outfit:</h3>
            <p>{outfit.suggestion}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default WeatherResult;
