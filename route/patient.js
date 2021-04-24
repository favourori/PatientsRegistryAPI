const express = require("express");
const { signup, verifyAccount, login } = require("../controller/patient");
const { patientSignup, patientLogin } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

router.post("/signup", validator(patientSignup), signup);
router.post("/verify", verifyAccount);

router.post("/login", validator(patientLogin), login);

module.exports = router;
