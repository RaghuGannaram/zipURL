const db = require("../configs/db.config");

const dbMiddleware = (req, res, next) => {
    req.db = db;
    next();
}

module.exports = dbMiddleware;
