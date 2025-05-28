const { spawn } = require("child_process");

const predictOutfit = (temperature, humidity, windSpeed) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["src/ml/predict.py", temperature, humidity, windSpeed]);
    
    let dataString = '';

    pythonProcess.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on("data", (error) => {
      console.error(`Error: ${error.toString()}`);
      reject(error.toString());
    });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Process exited with code ${code}`);
        return;
      }
      
      try {
        // Parse the Python output as JSON
        const cleanedData = dataString.replace(/'/g, '"').trim();
        const result = JSON.parse(cleanedData);
        resolve(result);
      } catch (error) {
        console.error("Error parsing Python output:", error);
        console.error("Raw output:", dataString);
        reject("Failed to parse outfit prediction");
      }
    });
  });
};

module.exports = { predictOutfit };
