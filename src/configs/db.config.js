const fs = require("fs");
const mysql = require("mysql");
const chalk = require("chalk");
const logger = require("./logger.config");
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
    const { host, port, database } = connection.config;

    logger.info("database connection succeeded... 🐬");
    logger.info("database server: host: " + chalk.magenta(host) + ":" + chalk.magenta(port));
    logger.info("database server: db: " + chalk.magenta(database));
});

db.on("connection", (connection) => {
    logger.info("database server: connection established...");
});

db.on("enqueue", () => {
    logger.info("database server: waiting for available database connection slot...");
});

db.on("release", (connection) => {
    logger.info("database server: connection released...");
});

db.on("error", (err) => {
    logger.error("database server: error:", err);
});

module.exports = db;
