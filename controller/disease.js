/* eslint-disable no-underscore-dangle */
const {
    InternalServerError,
    NotFound
  } = require("http-errors");
  const { accessToken } = require("../helpers/authHelper");
  const Disease = require("../model/disease");
  
  exports.createDisease = async (req, res) => {
    try {
    
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
  
  

  exports.getDisease = async (req, res) => {

    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "id is required",
            });
        }
        const disease = await Disease.findOne({
            _id: id,
        });

        if (!disease){
            throw new NotFound("Disease not found");
        }
        return res.status(200).json({
            status: true,
            message: "Disease retrived",
            data: disease
        });
        
    }catch(error){
        return res.status(error.status || 404).send({
            status: false,
            message: error.message
        });
    }
  }