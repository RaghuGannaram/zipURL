const crypto = require("crypto");

const generateHash = (url) => {
	const hashMD5 = crypto.createHash("md5");
	let hex = hashMD5.update(url).digest().toString("hex");

	let dec = parseInt(hex, 16);

	const base62 = {
		charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
		encode: (integer) => {
			if (integer === 0) {
				return 0;
			}

			let s = [];
			while (integer > 0) {
				s = [base62.charset[integer % 62], ...s];
				integer = Math.floor(integer / 62);
			}

			return s.join("");
		},
		decode: (chars) =>
			chars
				.split("")
				.reverse()
				.reduce((prev, curr, i) => prev + base62.charset.indexOf(curr) * 62 ** i, 0),
	};

	return base62.encode(dec);
};

module.exports = generateHash;
