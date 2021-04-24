const express = require("express");
const { adminSignup } = require("../controller/admin");
const { validator } = require("../middlewares/validationMid");
const { adminSignupValidation } = require("../helpers/validationSchema");

const router = express.Router();

router.post("/signup", validator(adminSignupValidation), adminSignup);

module.exports = router;
