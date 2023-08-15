const db = require("../configs/db.config");

const connectToDataBase = (req, res, next) => {
	req.db = db;
	next();
}

module.exports = connectToDataBase;
