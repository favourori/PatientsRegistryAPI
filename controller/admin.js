const {
  InternalServerError,
  Forbidden,
  NotFound,
  Unauthorized
} = require("http-errors");
const Admin = require("../model/admin");

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
