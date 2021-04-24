const express = require("express");
const { createDisease, getDisease} = require("../controller/disease");
const { diseaseCreate } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

router.post("/create", validator(diseaseCreate), createDisease);
router.get("/:id", getDisease);

module.exports = router;
