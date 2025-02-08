import joblib
import numpy as np
import sys
import pandas as pd

# Load the trained model
model = joblib.load("src/ml/outfit_model.pkl")

def predict_outfit(temperature, humidity, wind_speed):
    input_data = pd.DataFrame([[temperature, humidity, wind_speed]], columns=["temperature", "humidity", "wind_speed"])
    category = model.predict(input_data)[0]

    # Map encoded values back to categories
    category_map = {0: "Winter", 1: "Spring", 2: "Summer", 3: "Hot"}
    return category_map.get(category, "Unknown")

# Example usage
if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python predict.py <temperature> <humidity> <wind_speed>")
        sys.exit(1)
    
    try:
        temperature = float(sys.argv[1])
        humidity = float(sys.argv[2])
        wind_speed = float(sys.argv[3])
        print(predict_outfit(temperature, humidity, wind_speed))
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
