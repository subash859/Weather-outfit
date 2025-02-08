import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Sample training data (temperature, humidity, wind speed -> outfit category)
data = {
    "temperature": [5, 15, 25, 35, 10, 20, 30, 40],
    "humidity": [80, 60, 50, 30, 85, 70, 40, 20],
    "wind_speed": [10, 5, 3, 2, 12, 8, 6, 4],
    "outfit_category": ["Winter", "Spring", "Summer", "Hot", "Winter", "Spring", "Summer", "Hot"]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Encode outfit categories
df["outfit_category"] = df["outfit_category"].astype("category").cat.codes

# Split data into training and testing
X = df.drop("outfit_category", axis=1)
y = df["outfit_category"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "C:/Users/subas/OneDrive/Desktop/weather-outfit/src/ml/outfit_model.pkl")
print("Model trained and saved!")
