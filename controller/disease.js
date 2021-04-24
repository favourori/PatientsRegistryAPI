/* eslint-disable no-underscore-dangle */
const {
  InternalServerError,
  NotFound,
  UnprocessableEntity
} = require("http-errors");
const mongoose = require("mongoose");
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
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntity("invalid disease id");
    }
    const disease = await Disease.findOne({
      _id: id
    });

    if (!disease) {
      throw new NotFound("Disease not found");
    }
    return res.status(200).json({
      status: true,
      message: "Disease retrived",
      data: disease
    });
  } catch (error) {
    return res.status(error.status || 404).send({
      status: false,
      message: error.message
    });
  }
};

exports.getDiseases = async (req, res) => {
  try {
    const perPage = Number(req.query.perPage) || 50;
    const page = Number(req.query.page) || 1;

    // const jobs = await Job.find({ status : { $eq: 'Open'}})
    const diseases = await Disease.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!diseases) {
      throw new NotFound("No Disease available");
    }

    const diseaseCount = diseases.length;
    return res.status(200).json({
      success: true,
      data: {
        diseases, page, perPage, diseaseCount
      },
      message: "Diseases retrived"
    });
  } catch (error) {
    return res.status(error.status || 404).send({
      status: false,
      message: error.message
    });
  }
};

exports.editDisease = async (req, res) => {

};
