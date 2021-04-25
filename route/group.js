const express = require("express");
const {
  createGroup,
  getGroup,
  getGroups,
  joinGroup,
  checkUserInGroup
} = require("../controller/group");
const { mustBeLoggedIn } = require("../helpers/authHelper");
const { groupValidation } = require("../helpers/validationSchema");
const { validator } = require("../middlewares/validationMid");

const router = express.Router();

router.post("/create", mustBeLoggedIn, validator(groupValidation), createGroup);
router.get("/all", mustBeLoggedIn, getGroups);
router.get("/:id", mustBeLoggedIn, getGroup);
router.post("/join/:id", mustBeLoggedIn, joinGroup);
router.get("/:id/user", mustBeLoggedIn, checkUserInGroup);

module.exports = router;
