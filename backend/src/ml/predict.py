import joblib
import numpy as np
import sys
import pandas as pd
import random

# Load the trained model and mappings
model = joblib.load("src/ml/outfit_model.pkl")
season_map = joblib.load("src/ml/season_map.pkl")
outfit_details = joblib.load("src/ml/outfit_details.pkl")

def predict_outfit(temperature, humidity, wind_speed):
    # Prepare input data
    input_data = pd.DataFrame([[temperature, humidity, wind_speed]], 
                             columns=["temperature", "humidity", "wind_speed"])
    
    # Predict season category
    season_code = model.predict(input_data)[0]
    season = season_map.get(season_code, "Unknown")
    
    # Get detailed outfit recommendation for the season
    if season in outfit_details:
        # Randomly select one of the outfit options for variety
        outfit_recommendation = random.choice(outfit_details[season])
    else:
        outfit_recommendation = "Comfortable clothing suitable for the weather"
    
    # Return both season and detailed outfit recommendation
    return {
        "season": season,
        "outfit": outfit_recommendation,
        "accessories": get_accessories(season, temperature, wind_speed)
    }

def get_accessories(season, temperature, wind_speed):
    """Provide accessory recommendations based on conditions"""
    accessories = []
    
    # Temperature-based accessories
    if temperature < 5:
        accessories.extend(["Thermal gloves", "Beanie", "Scarf"])
    elif temperature < 15:
        accessories.append("Light gloves")
    elif temperature > 25:
        accessories.extend(["Sunglasses", "Sun hat"])
    
    # Wind-based accessories
    if wind_speed > 8:
        accessories.append("Windbreaker")
    
    # Season-specific accessories
    if season == "Winter":
        accessories.extend(["Moisturizer", "Lip balm"])
    elif season == "Summer" or season == "Hot":
        accessories.extend(["Sunscreen", "Water bottle"])
    elif season == "Spring":
        accessories.append("Umbrella")
    
    return accessories if accessories else ["No special accessories needed"]

# Example usage
if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python predict.py <temperature> <humidity> <wind_speed>")
        sys.exit(1)
    
    try:
        temperature = float(sys.argv[1])
        humidity = float(sys.argv[2])
        wind_speed = float(sys.argv[3])
        result = predict_outfit(temperature, humidity, wind_speed)
        print(result)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
