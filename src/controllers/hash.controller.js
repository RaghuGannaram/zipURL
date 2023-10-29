const createError = require("http-errors");
const hashModel = require("../model/hash.model");
const catchAsyncError = require("../middlewares/catch-async-error.middleware");
const generateHash = require("../utils/generate-hash");
const validateHash = require("../utils/validate-hash");
const logger = require("../configs/logger.config");

const fetchURL = catchAsyncError(async (req, res, next) => {
	const { hash } = req.params;
	logger.info("hash.controller: fetching url for hash: %s", hash);

	if (validateHash(hash)) {
		const { results } = await hashModel.getURLByHash(req.db, hash);
		if (results.length) {
			logger.debug("hash.controller: redirecting to url: %s", results[0].url);
			res.redirect(results[0].url);
			return;
		}
	}

	logger.debug("hash.controller: invalid hash: %s", hash);

	res.redirect("/app/404.html");
});

const hashGen = catchAsyncError(async (req, res, next) => {
	const { url } = req.body;
	logger.info("hash.controller: generating hash for url: %s", url);

	if (url.length === 0) {
		logger.error("hash.controller: url not provided");
		throw createError(400, "Please provide url");
	}

	const hash = generateHash();
	if (!hash) {
		logger.error("hash.controller: hash generation failed");
		throw createError(500, "Internal Server Error");
	}
	await hashModel.storeHashURLPair(req.db, hash, url);

	logger.debug("hash.controller: hash generation successfull %s", hash);
	res.status(201).send({ message: "hash generation successfull", url: url, hash: hash });
});

module.exports = {
	fetchURL,
	hashGen,
};
