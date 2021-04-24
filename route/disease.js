const express = require("express");
const { createDisease, getDisease, getDiseases } = require("../controller/disease");
const { mustBeLoggedIn } = require("../helpers/authHelper");
const { diseaseCreate } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

router.post("/create", mustBeLoggedIn, validator(diseaseCreate), createDisease);
router.get("/all", getDiseases);
router.get("/:id", getDisease);

module.exports = router;
