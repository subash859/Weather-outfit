const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = require("./src/app");

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
