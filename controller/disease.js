/* eslint-disable no-underscore-dangle */
const {
    InternalServerError,
  } = require("http-errors");
  const { accessToken } = require("../helpers/authHelper");
  const Disease = require("../model/disease");
  
  exports.createDisease = async (req, res) => {
    try {
      // get the payload from body
      const {
        name, description, synonyms, symptoms, causes
      } = req.body;
  
  
      // save the disease in the database
      const newDisease = await Disease.create(req.body);
  
      // return error if disease  did not save
      if (!newDisease) {
        throw InternalServerError("Unable to create disease");
      }
  
      // return successfull message and new disease
      return res.status(201).send({
        status: true,
        message: "Disease created",
        data: newDisease
      });
    } catch (error) {
      return res.status(error.status || 400).send({
        status: false,
        message: error.message
      });
    }
  };
  
  