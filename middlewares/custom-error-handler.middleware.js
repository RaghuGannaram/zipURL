const { getCurrentEnv } = require("../utils/env-info");
const logger = require("../configs/winston.config");

function customErrorHandler(err, req, res, next) {
	logger.error(`${req.method} ${req.originalUrl}: ${err.status} - ${err.message} - ${req.ip} \n%o`, err.stack);

	const currentEnv = getCurrentEnv();
	err.status = err.status || 500;
	err.message = err.message || "Internal Server Error";
	res.status(err.status).json({
		...err,
		stack: currentEnv === "development" ? err.stack : {},
	});
}

module.exports = customErrorHandler;
