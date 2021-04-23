const express = require("express");
const { signup, verifyAccount } = require("../controller/userControllers");
const { patientSignup } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

router.post("/signup", validator(patientSignup), signup);
router.post("/verify", verifyAccount);

module.exports = router;
