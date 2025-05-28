// This is a Node.js script to download placeholder images
// Run with: node download-accessories.js
const fs = require('fs');
const https = require('https');
const path = require('path');

// Create accessories directory if it doesn't exist
const accessoriesDir = path.join(__dirname, 'accessories');
if (!fs.existsSync(accessoriesDir)) {
  fs.mkdirSync(accessoriesDir);
}

// List of accessories to download
const accessories = [
  { name: 'sunglasses', url: 'https://cdn-icons-png.flaticon.com/512/3636/3636080.png' },
  { name: 'umbrella', url: 'https://cdn-icons-png.flaticon.com/512/2948/2948185.png' },
  { name: 'scarf', url: 'https://cdn-icons-png.flaticon.com/512/2806/2806118.png' },
  { name: 'gloves', url: 'https://cdn-icons-png.flaticon.com/512/2271/2271058.png' },
  { name: 'hat', url: 'https://cdn-icons-png.flaticon.com/512/1974/1974288.png' },
  { name: 'sunscreen', url: 'https://cdn-icons-png.flaticon.com/512/2553/2553627.png' },
  { name: 'windbreaker', url: 'https://cdn-icons-png.flaticon.com/512/2405/2405432.png' }
];

// Download each accessory image
accessories.forEach(accessory => {
  const filePath = path.join(accessoriesDir, `${accessory.name}.png`);
  const file = fs.createWriteStream(filePath);
  
  https.get(accessory.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${accessory.name}.png`);
    });
  }).on('error', err => {
    fs.unlink(filePath);
    console.error(`Error downloading ${accessory.name}: ${err.message}`);
  });
});
