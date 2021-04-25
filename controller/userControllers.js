const { NotFound } = require("http-errors");
const Patient = require("../model/patient");

exports.userProfile = async (req, res) => {
  try {
    const userId = res.locals.user.id;

    // get user's details
    const userDetails = await Patient.findById(userId);
    if (!userDetails) {
      throw new NotFound("User detials was not found");
    }

    return res.status(200).json({
      status: true,
      message: "User details fetched succesfully",
      data: userDetails
    });
  } catch (error) {
    return res.status(error.status || 400).json({
      status: false,
      message: error.message
    });
  }
};
