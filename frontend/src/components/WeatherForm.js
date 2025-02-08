import { useState } from "react";

const WeatherForm = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <div className="container">
      <h1>Weather-Based Outfit Suggestion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Suggestion</button>
      </form>
    </div>
  );
};

export default WeatherForm;
