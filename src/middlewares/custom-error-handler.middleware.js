const { getCurrentEnv } = require("../utils/env-info");
const logger = require("../configs/logger.config");

function customErrorHandler(err, req, res, next) {
    logger.error(`${req.method} ${req.originalUrl}: ${err.status} - ${err.message} - ${req.ip} \n%o`, err.stack);

    const currentEnv = getCurrentEnv();

    if (err.isJoi === true) {
        err.status = 422;
        err.message = "Unprocessable Entity";
        err.type = "VALIDATION_ERROR";
        err.description = "Validation failed. Check your request data.";
    }

    err.status = err.status ?? 500;
    err.message = err.message ?? "Internal Server Error";
    err.type = err.type ?? "INTERNAL_SERVER_ERROR";
    err.description = err.description ?? "Internal server error.";

    if (currentEnv === "production") {
        res.status(err.status).json({
            status: err.status,
            message: err.message
        });
        return;
    }

    res.status(err.status).json({
        status: err.status,
        message: err.message,
        type: err.type,
        description: err.description,
        ...err,
        stack: err.stack
    });
}

module.exports = customErrorHandler;
