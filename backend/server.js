const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { initializeModel } = require('./src/ml/initModel');
const weatherRoutes = require('./src/routes/weatherRoutes');
const outfitRoutes = require('./src/routes/outfitRoutes');

// Import error handler middleware
const errorHandler = require('./src/middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/weatherOutfits", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/outfit', outfitRoutes);

// POST route to save outfit suggestion
app.post('/api/save-outfit', async (req, res) => {
  const { temperature, humidity, condition, suggestion } = req.body;
  const Outfit = require('./src/models/Outfit');

  try {
    const newOutfit = new Outfit({
      temperature,
      humidity,
      condition,
      suggestion
    });

    const saved = await newOutfit.save();
    res.status(201).json({ message: "Outfit saved", data: saved });
  } catch (err) {
    res.status(500).json({ error: "Error saving outfit", details: err.message });
  }
});

// Error handling middleware
app.use(errorHandler);

// Initialize ML model and start server
initializeModel()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize ML model:', err);
    console.log('Starting server without ML model initialization...');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
