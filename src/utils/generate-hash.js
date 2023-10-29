const fs = require("fs");
const path = require("path");
const logger = require("../configs/logger.config");

function hashGen(seed) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let currentHash = seed,
        currentIndex = currentHash.split("").map((char) => alphabet.indexOf(char)),
        nextHash = "";

    return function () {
        for (let i = currentIndex.length - 1; i >= 0; i--) {
            if (currentIndex[i] === alphabet.length - 1) {
                currentIndex[i] = 0;
            } else {
                currentIndex[i] += 1;
                break;
            }
        }

        currentHash = currentIndex.map((index) => alphabet[index]).join("");
        nextHash = currentHash;
        fs.writeFileSync(path.join(__dirname, "../../database/hash.json"), JSON.stringify({ seed: nextHash }, null, 2), "utf8");

        logger.info("generate-hash: hash: %s", nextHash);

        return nextHash;
    };
}

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../../database/hash.json"), "utf8"));
const generateHash = hashGen(data.seed);

module.exports = generateHash;
