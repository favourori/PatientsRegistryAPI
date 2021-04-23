const Joi = require("@hapi/joi");

const patientSignup = Joi.object().keys({
  firstname: Joi.string().trim().min(2).label("firstname")
    .required(),
  lastname: Joi.string().trim().min(2).label("lastname")
    .required(),
  country: Joi.string().trim().label("country").required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email")
    .required(),
  password: Joi.string().trim().label("password").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength")
    .required(),
  phone: Joi.string().trim().label("phone").required()
});

module.exports = {
  patientSignup

};
