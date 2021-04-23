/* eslint-disable no-underscore-dangle */
const {
  NotFound,
  UnprocessableEntity,
  InternalServerError,
  Conflict,
  Unauthorized,
  createError,
  BadRequest,
  Forbidden
} = require("http-errors");
const { accessToken } = require("../helpers/authHelper");
const Patients = require("../model/patient");

exports.signup = async (req, res) => {
  try {
    // get the payload from body
    const {
      firstname,
      lastname,
      email,
      phone,
      country,
      password
    } = req.body;

    // check if user with the email exist in the database before
    const checkPatient = await Patients.findOne({ email }, { email: 1 });
    if (checkPatient) {
      throw new Forbidden("User with this email address exist");
    }

    // save the data in the database
    const PatientData = await Patients.create({
      firstname, lastname, email, phone, country, password
    });

    // return error if data did not save
    if (!PatientData) {
      throw InternalServerError("Unable to save user's data");
    }

    const token = await accessToken({ email: PatientData.email, id: PatientData._id });

    // return successfull message and patient data
    return res.status(201).send({
      status: true,
      message: "User registrattion completed",
      data: {
        PatientData,
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
