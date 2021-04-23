/* eslint-disable no-underscore-dangle */
const {
  InternalServerError,
  Forbidden,
  NotFound
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

    // Generate 4 digits code
    const verificationCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    // console.log(verificationCode);

    // save the data in the database
    const PatientData = await Patients.create({
      firstname, lastname, email, phone, country, password, verificationCode
    });

    // return error if data did not save
    if (!PatientData) {
      throw InternalServerError("Unable to save user's data");
    }

    // return successfull message and patient data
    return res.status(201).send({
      status: true,
      message: "User registrattion completed",
      data: PatientData
    });
  } catch (error) {
    return res.status(error.status || 400).send({
      status: false,
      message: error.message
    });
  }
};

exports.verifyAccount = async (req, res) => {
  try {
    // query the code
    const { verificationCode } = req.body;
    // find the code
    const patient = await Patients.findOne({ verificationCode });
    if (!patient) {
      throw new NotFound("This code is invalid");
    }
    // create token
    const token = await accessToken({ email: patient.email, id: patient._id });

    // delete verificationCode for the user
    await Patients.findOneAndUpdate({ verificationCode }, { $set: { verificationCode: null } });

    return res.status(200).send({
      status: true,
      message: "Account Verification successfull",
      data: {
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
