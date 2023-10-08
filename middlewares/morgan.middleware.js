const morgan = require("morgan");
const { getCurrentEnv } = require("../utils/env-info");
const logger = require("../configs/winston.config");

const stream = {
	write: (message) => logger.http(message.toString().trim()),
};

const skip = () => {
	return false;

	const currentEnv = getCurrentEnv();
	return currentEnv !== "development";
};

const morganMiddleware = morgan(" :remote-addr :method :url :status :res[content-length] - :response-time ms", { stream, skip });

module.exports = morganMiddleware;
