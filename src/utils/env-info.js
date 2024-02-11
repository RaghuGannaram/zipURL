function getCurrentEnv() {
    return process.env.NODE_ENV || "development";
}

function getCurrentPort() {
    return process.env.PORT || 5000;
}

function getCurrentLogLevel() {
    return process.env.LOG_LEVEL || "debug";
}

function getCurrentDBHost() {
    const db_hostname = process.env.MySQL_DB_HOSTNAME;
    const db_port = process.env.MySQL_DB_PORT;
    const db_username = process.env.MySQL_DB_USERNAME;
    const db_password = process.env.MySQL_DB_PASSWORD;
    const db_dbname = process.env.MySQL_DB_DATABASE;

    return {
        db_hostname,
        db_username,
        db_password,
        db_dbname,
        db_port,
    };
}

module.exports = { getCurrentEnv, getCurrentPort, getCurrentLogLevel, getCurrentDBHost };
