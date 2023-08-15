const getURLByHash = (db, hash) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT originalURL FROM HashTable WHERE hashValue = \"${hash}\"`, (error, results, fields) => {
			if (error) {
				reject(error);
			}
			resolve({ results, fields });
		});
	});
};

const storeHashURLPair = (db, hash, url) => {
	return new Promise((resolve, reject) => {
		db.query("INSERT INTO HashTable (hashValue, originalURL) VALUES (?, ?);", [hash, url], (error, result) => {
			if (error) {
				reject(error);
			}
			if (!error && result) {
				resolve(result);
			}
		});
	});
};

module.exports = { getURLByHash, storeHashURLPair };
