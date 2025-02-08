const express = require("express");
const weatherRoutes = require("./routes/weatherRoutes");
const outfitRoutes = require("./routes/outfitRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

// Routes
app.use("/weather", weatherRoutes);
app.use("/outfit", outfitRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
