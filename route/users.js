const express = require("express");
const { userProfile } = require("../controller/userControllers");
const { mustBeLoggedIn } = require("../helpers/authHelper");

const router = express.Router();

router.get("/me", mustBeLoggedIn, userProfile);
module.exports = router;
