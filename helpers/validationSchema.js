const Joi = require("@hapi/joi");

const patientSignup = Joi.object().keys({
  firstname: Joi.string().trim().min(2).label("firstname")
    .required(),
  lastname: Joi.string().trim().min(2).label("lastname")
    .required(),
  dob: Joi.string().trim().min(2).label("dob")
    .required(),
  address: Joi.string().trim().min(2).label("address")
    .required(),
  country: Joi.string().trim().label("country").required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  // password: Joi.string().trim().label("password").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength")
  //   .required(),
  password: Joi.string().trim().min(2).label("password")
    .required(),
  phone: Joi.string().trim().label("phone").required()
});

const diseaseCreate = Joi.object().keys({
  name: Joi.string().trim().min(2).label("name")
    .required(),
  description: Joi.string().trim().min(2).label("description")
    .required(),
  symptoms: Joi.string().trim().min(2).label("symptoms")
    .required(),
  causes: Joi.string().trim().min(2).label("causes")
    .required()
});

const patientLogin = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  password: Joi.string().trim().label("password")
    .required()
});

const adminSignupValidation = Joi.object().keys({
  firstname: Joi.string().trim().min(2).label("firstname")
    .required(),
  lastname: Joi.string().trim().min(2).label("lastname")
    .required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  password: Joi.string().trim().label("password").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength")
    .required(),
  role: Joi.string().trim().required()
});

const adminLoginValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  password: Joi.string().trim().label("password")
    .required()
});

const groupValidation = Joi.object().keys({
  name: Joi.string().trim().min(2).label("name")
    .required()
});

module.exports = {
  patientSignup,
  diseaseCreate,
  patientLogin,
  adminSignupValidation,
  adminLoginValidation,
  groupValidation
};
