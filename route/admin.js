const express = require("express");
const { adminSignup, adminLogin } = require("../controller/admin");
const { validator } = require("../middlewares/validationMid");
const { adminSignupValidation, adminLoginValidation } = require("../helpers/validationSchema");

const router = express.Router();

router.post("/signup", validator(adminSignupValidation), adminSignup);
router.post("/login", validator(adminLoginValidation), adminLogin);

module.exports = router;
