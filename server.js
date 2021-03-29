const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", require("./routes/router-index"));

server.get('/', (req, res) => {
    res.send(` DECOREM is up boyee `);
  });

server.use((err, req, res, next) => {
    console.log(" -----------------------\n\n Error:",err)
    res.status(500).json({
      message: "Whoops, something went wrong",
    })
  });

module.exports = server;