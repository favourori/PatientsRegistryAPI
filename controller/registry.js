const mongoose = require("mongoose");
const {
  InternalServerError,
  NotFound,
  UnprocessableEntity
} = require("http-errors");
const Disease = require("../model/disease");
const Registry = require("../model/registry");

exports.chooseDisease = async (req, res) => {
  try {
    const { diseaseId } = req.body;
    const patientId = res.locals.user.id;

    // check disease id validity
    if (!mongoose.Types.ObjectId.isValid(diseaseId)) {
      throw new UnprocessableEntity("invalid disease id");
    }

    // check if disease exists
    const checkDisease = await Disease.findById(diseaseId);
    if (!checkDisease) {
      throw new NotFound("Disease cant be found, it seems it has been deleted");
    }

    // register patient for the disease
    const patientDiseaseRegister = await Registry.create({
      disease: diseaseId, patient: patientId
    });
    if (!patientDiseaseRegister) {
      throw InternalServerError("An error occured while trying to persist to data");
    }

    return res.status(201).json({
      status: true,
      message: "Data successfully saved",
      data: patientDiseaseRegister
    });
  } catch (error) {
    return res.status(error.status || 400).json({
      status: false,
      message: error.message
    });
  }
};
