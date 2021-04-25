const express = require("express");
const { createGroup, getGroup, getGroups} = require("../controller/group");
const { mustBeLoggedIn } = require("../helpers/authHelper");
const { groupValidation} = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

router.post("/create",  validator(groupValidation), createGroup);
router.get("/all",  getGroups);
router.get("/:id",  getGroup);

module.exports = router;
