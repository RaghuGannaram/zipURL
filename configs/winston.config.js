const winston = require("winston");
const getEnvironment = require("../utils/getEnvironment");
const chalk = require("chalk");

const { addColors, createLogger, format, transports } = winston;

const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	verbose: "cyan",
	debug: "blue",
	silly: "pink",
};

addColors(colors);

const customLogFormat = format.printf(({ level, message, timestamp, stack }) => {
	const colorizedTimestamp = chalk.grey(timestamp);
	const formattedMessage = typeof message === "object" ? util.inspect(message) : message;
	const colorizedStack = stack ? chalk.red(stack) : "";

	let logMessage = `${colorizedTimestamp} ${level} ${formattedMessage}`;

	if (stack) {
		logMessage += `\n${colorizedStack}`;
	}

	return logMessage;
});

const logger = createLogger({
	level: "debug",
	format: format.json(),
	transports: [new transports.File({ filename: "logs/error.log", level: "error" }), new transports.File({ filename: "logs/request.log", level: "http" })],
});

if (getEnvironment() !== "production") {
	logger.add(
		new transports.Console({
			format: format.combine(format.colorize(), format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), format.errors({ stack: true }), customLogFormat),
		})
	);
}

module.exports = logger;
