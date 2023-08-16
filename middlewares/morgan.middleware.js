const morgan = require("morgan");
const getEnvironment = require("../utils/getEnvironment");
const logger = require("../configs/winston.config");

const stream = {
	write: (message) => logger.http(message.toString().trim()),
};

const skip = () => {
	return getEnvironment() !== "development";
};

const morganMiddleware = morgan(" :remote-addr :method :url :status :res[content-length] - :response-time ms", { stream, skip });

module.exports = morganMiddleware;
