function validateHash(hash){
    return hash.length === 6 && hash.match(/^[a-zA-Z0-9]+$/)
}

module.exports = validateHash;