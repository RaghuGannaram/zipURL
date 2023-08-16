const createError = require("http-errors");
const hashModel = require("../model/hash.model");
const catchAsyncError = require("../middlewares/catchAsyncError.middleware");
const generateHash = require("../utils/generateHash");
const validateHash = require("../utils/validateHash");
const logger = require("../configs/winston.config");

const fetchURL = catchAsyncError(async (req, res, next) => {
	const { hash } = req.params;
	logger.debug(`hash.controller : fetching url for hash: %s`, hash);

	if (validateHash(hash)) {
		const { results } = await hashModel.getURLByHash(req.db, hash);
		if (results.length) {
			res.redirect(results[0].url);
			return;
		}
	}
	res.redirect("/app/404.html");
});

const hashGen = catchAsyncError(async (req, res, next) => {
	const { url } = req.body;
	logger.debug(`hash.controller : generating hash for url: %s`, url);

	if (url.length === 0) {
		throw createError(400, "Please provide valid url");
	}

	const hash = generateHash();
	if (!hash) {
		throw createError(500, "Internal Server Error");
	}
	await hashModel.storeHashURLPair(req.db, hash, url);

	res.status(201).send({ message: "hash generation successfull", url: url, hash: hash });
});

module.exports = {
	fetchURL,
	hashGen,
};
