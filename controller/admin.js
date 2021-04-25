/* eslint-disable no-underscore-dangle */
const {
  InternalServerError,
  Forbidden,
  NotFound,
  Unauthorized
} = require("http-errors");
const Admin = require("../model/admin");
const { accessToken, isPasswordValid } = require("../helpers/authHelper");

exports.adminSignup = async (req, res) => {
  try {
    // get the payload
    const {
      email, password, role, firstname, lastname
    } = req.body;

    // check admin if email exist
    const checkAdmin = await Admin.findOne({ email }, { email: 1 });
    if (checkAdmin) {
      throw new Forbidden("Admin/researcher with this email address exist");
    }

    const adminData = await Admin.create({
      email,
      password,
      role,
      firstname,
      lastname
    });

    if (!adminData) {
      throw new InternalServerError("Unable to save admin/researchers data");
    }
    return res.status(201).send({
      status: true,
      message: "User registrattion completed",
      data: adminData
    });
  } catch (error) {
    return res.status(error.status || 400).send({
      status: false,
      message: error.message
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    // get the payload from the body
    const { email, password } = req.body;

    // check for the user using the email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new NotFound("Incorrect login details");
    }

    // check user password
    const checkPassword = await isPasswordValid(admin.password, password);
    admin.password = null;

    if (!checkPassword) {
      throw new Unauthorized("Incorrect login details, please check that the email and password are correct");
    }

    // create token for user
    const token = await accessToken({ email: admin.email, id: admin._id, role: admin.role });
    return res.status(200).send({
      status: true,
      message: "Login was Succesfull",
      data: {
        admin,
        token
      }

    });
  } catch (error) {
    return res.status(error.status || 400).send({
      status: false,
      message: error.message
    });
  }
};
