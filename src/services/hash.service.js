const createError = require("http-errors");
const logger = require("../configs/logger.config");

const getURLByHash = (db, hash) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT url FROM HashTable WHERE hash = ?", [hash], (error, results, fields) => {
            if (error) {
                logger.error(`hash.service: %o`, error);
                reject(createError(500, "Internal Serevr Error"));
            }
            logger.debug(`hash.service: results - %o , fields - %o`, results, fields);
            resolve({ results, fields });
        });
    });
};

const storeHashURLPair = (db, hash, url) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO HashTable (hash, url) VALUES (?, ?);", [hash, url], (error, result) => {
            if (error) {
                logger.error(`hash.service: %o`, error);
                reject(createError(500, "Internal Server Error"));
            }
            if (!error && result) {
                logger.debug(`hash.service: result - %o`, result);
                resolve(result);
            }
        });
    });
};

module.exports = { getURLByHash, storeHashURLPair };
