const express = require("express");
const hashController = require("../controllers/hash.controller");

const router = express.Router();

router.get("/:hash", hashController.fetchURL);

router.post("/api/v1/generate-hash", hashController.hashGen);

module.exports = router;
