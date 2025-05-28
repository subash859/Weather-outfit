import { useState } from "react";
import { useFormStatus } from "react-dom";

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="search-button"
    >
      {pending ? "Searching..." : "Get Suggestion"}
    </button>
  );
}

const WeatherForm = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <div className="form-container">
      <h1>Weather-Based Outfit Suggestion</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
            className="city-input"
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default WeatherForm;
