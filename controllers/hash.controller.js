const createError = require("http-errors");
const hashModel = require("../model/hash.model");
const catchAsyncError = require("../middlewares/catchAsyncError.middleware");
const generateHash = require("../utils/generateHash");

const fetchURL = catchAsyncError(async (req, res, next) => {
	const { hash } = req.params;

	const { results, fields } = await hashModel.getURLByHash(req.db, hash);

	if (!results.length) res.redirect("/app/404.html");
	else res.redirect(results[0].originalURL);
});

const hashGen = catchAsyncError(async (req, res, next) => {
	const { url } = req.body;
	const hash = generateHash(url);

	await hashModel.storeHashURLPair(req.db, hash, url);

	res.status(201).send({ message: "hash generation successfull", url: url, hash: hash });
});

module.exports = {
	fetchURL,
	hashGen,
};
