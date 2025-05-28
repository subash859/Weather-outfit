import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Enhanced training data with more detailed seasonal outfit recommendations
data = {
    "temperature": [0, 5, 10, 15, 20, 25, 30, 35, 8, 12, 18, 22, 28, 32, 3, 7],
    "humidity": [70, 80, 65, 60, 55, 50, 40, 30, 75, 70, 60, 55, 45, 35, 85, 75],
    "wind_speed": [12, 10, 8, 6, 5, 4, 3, 2, 9, 7, 6, 5, 4, 3, 11, 9],
    "season": ["Winter", "Winter", "Spring", "Spring", "Summer", "Summer", "Hot", "Hot", 
               "Winter", "Spring", "Spring", "Summer", "Summer", "Hot", "Winter", "Winter"],
    "outfit_details": [
        "Heavy coat, scarf, gloves, winter boots, thermal layers",
        "Insulated jacket, wool sweater, hat, warm pants, boots",
        "Light jacket, long-sleeve shirt, jeans, sneakers",
        "Cardigan, t-shirt, light pants, comfortable shoes",
        "T-shirt, shorts/skirt, light footwear, sun hat",
        "Light breathable clothing, shorts, sandals, sunglasses",
        "Loose cotton clothing, shorts, tank top, sun protection",
        "Minimal lightweight clothing, sun hat, sunglasses, sandals",
        "Warm coat, sweater, boots, gloves, beanie",
        "Windbreaker, long-sleeve shirt, pants, light scarf",
        "Light sweater, t-shirt, jeans, sneakers",
        "T-shirt, light pants/skirt, casual shoes",
        "Breathable shirt, shorts, cap, sunglasses",
        "Lightweight clothing, sun protection, sandals, hat",
        "Heavy winter coat, thermal layers, snow boots, scarf, gloves",
        "Insulated jacket, warm layers, waterproof boots, hat"
    ]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Encode season categories
df["season_code"] = df["season"].astype("category").cat.codes

# Split data into training and testing
X = df[["temperature", "humidity", "wind_speed"]]
y = df["season_code"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Create season to outfit mapping
season_outfit_map = {}
for season in df["season"].unique():
    season_outfits = df[df["season"] == season]["outfit_details"].tolist()
    season_outfit_map[season] = season_outfits

# Save model and mapping
joblib.dump(model, "src/ml/outfit_model.pkl")
joblib.dump(season_outfit_map, "src/ml/outfit_details.pkl")

# Create a mapping dictionary for season codes
season_map = {code: season for code, season in zip(df["season_code"].unique(), df["season"].unique())}
joblib.dump(season_map, "src/ml/season_map.pkl")

print("Model and outfit details trained and saved!")
