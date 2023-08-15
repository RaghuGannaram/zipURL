function customErrorHandler(err, req, res, next) {
	err.status = err.status || 500;
	err.message = err.message || "Internal Server Error";
	res.status(err.status).json({
		...err,
		stack: process.env.NODE_ENV === "development" ? err.stack : {},
	});
}

module.exports = customErrorHandler;
