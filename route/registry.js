const express = require("express");
const { chooseDisease } = require("../controller/registry");
const { mustBeLoggedIn } = require("../helpers/authHelper");

const router = express.Router();

router.post("/choose", mustBeLoggedIn, chooseDisease);

module.exports = router;
