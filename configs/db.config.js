const fs = require("fs");
const mysql = require("mysql");
const chalk = require("chalk");
const logger = require("./winston.config");

const db_hostname = process.env.MySQL_DB_HOSTNAME;
const db_port = process.env.MySQL_DB_PORT;
const db_username = process.env.MySQL_DB_USERNAME;
const db_password = process.env.MySQL_DB_PASSWORD;
const db_dbname = process.env.MySQL_DB_DATABASE;

const db = new mysql.createPool({
	host: db_hostname,
	user: db_username,
	password: db_password,
	database: db_dbname,
	port: db_port,
	ssl: { ca: fs.readFileSync("./certificates/cacert.pem") },
});

db.getConnection((err, connection) => {
	if (err) {
		console.log("Unable to connect to Database...🙁");
		throw err;
	}
	const { host, database } = connection.config;

	logger.info("database connection succeeded... 🐬");
	logger.info("database host: " + chalk.magenta(host));
	logger.info("database name: " + chalk.magenta(database));
});

module.exports = db;
