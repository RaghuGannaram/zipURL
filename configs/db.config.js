const fs = require("fs");
const mysql = require("mysql");
const chalk = require("chalk");
const logger = require("./winston.config");
const { getCurrentDBHost } = require("../utils/env-info");

const { db_hostname, db_port, db_username, db_password, db_dbname } = getCurrentDBHost();

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
