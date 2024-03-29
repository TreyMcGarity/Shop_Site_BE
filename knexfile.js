require('dotenv').config();

module.exports = {
	development: {
		client: "postgresql",
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_SERVER,
			port: process.env.DB_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},
	staging: {
		client: "postgresql",
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_SERVER,
			port: process.env.DB_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./data/migrations",
		},
	},
	production: {
		client: "postgresql",
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_SERVER,
			port: process.env.DB_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./data/migrations",
		},
	},
	test: {
		client: "postgresql",
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_SERVER,
			port: process.env.DB_PORT,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},
};
