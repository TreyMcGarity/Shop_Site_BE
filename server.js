const express = require('express');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", require("./routes/router-index"));

server.use(session({
	name: 'token',
	secret: process.env.SESSION_SECRET,
	cookie: {
		httpOnly: true
	},
	resave: false,
	saveUninitialized: false,
	store: new KnexSessionStore({
		knex: configure,
		createtable: true,
	}),
}))

server.get('/', (req, res) => {
    res.send(` DECOREM is up boyee `);
  });

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
      message: "Something went wrong",
    })
  });

module.exports = server;