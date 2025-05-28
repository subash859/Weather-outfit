const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if model files exist
const modelPath = path.join(__dirname, 'outfit_model.pkl');
const detailsPath = path.join(__dirname, 'outfit_details.pkl');
const seasonMapPath = path.join(__dirname, 'season_map.pkl');

const initializeModel = () => {
  return new Promise((resolve, reject) => {
    // Check if model files already exist
    if (fs.existsSync(modelPath) && fs.existsSync(detailsPath) && fs.existsSync(seasonMapPath)) {
      console.log('ML model files already exist. Skipping initialization.');
      resolve();
      return;
    }

    console.log('Initializing ML model...');
    const pythonProcess = spawn('python', [path.join(__dirname, 'outfitModel.py')]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log('ML model initialized successfully');
        resolve();
      } else {
        const error = `ML model initialization failed with code ${code}`;
        console.error(error);
        reject(new Error(error));
      }
    });
  });
};

module.exports = { initializeModel };