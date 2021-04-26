const express = require("express");
const {
  createDisease,
  getDisease,
  getDiseases,
  patients
} = require("../controller/disease");
const { mustBeLoggedIn } = require("../helpers/authHelper");
const { diseaseCreate } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

router.post("/create", mustBeLoggedIn, validator(diseaseCreate), createDisease);
router.get("/all", mustBeLoggedIn, getDiseases);
router.get("/:id", mustBeLoggedIn, getDisease);
router.get("/:diseaseId/patients", patients);

module.exports = router;
