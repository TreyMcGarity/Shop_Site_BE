const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
// server.use("/api", require("./routes/router-index"));

server.get('/', (req, res) => {
    res.send(`Welcome to the party!`);
  });

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
      message: "Something went wrong",
    })
  });

module.exports = server;