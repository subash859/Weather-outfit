const { spawn } = require("child_process");

const predictOutfit = (temperature, humidity, windSpeed) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["src/ml/predict.py", temperature, humidity, windSpeed]);

    pythonProcess.stdout.on("data", (data) => {
      resolve(data.toString().trim());
    });

    pythonProcess.stderr.on("data", (error) => {
      console.error(`Error: ${error.toString()}`);
      reject(error.toString());
    });
  });
};

module.exports = { predictOutfit };
