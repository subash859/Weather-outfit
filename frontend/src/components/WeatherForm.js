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
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-lg">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white w-full rounded">
        Get Outfit Suggestion
      </button>
    </form>
  );
};

export default WeatherForm;
