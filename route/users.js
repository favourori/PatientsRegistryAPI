const express = require("express");
const { signup } = require("../controller/userControllers");
const { patientSignup } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

router.post("/signup", validator(patientSignup), signup);

module.exports = router;
