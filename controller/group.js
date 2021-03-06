/* eslint-disable no-underscore-dangle */
const {
  InternalServerError,
  NotFound,
  UnprocessableEntity,
  BadRequest
} = require("http-errors");
const mongoose = require("mongoose");
const Group = require("../model/group");

exports.createGroup = async (req, res) => {
  try {
    // save the group in the database
    const newGroup = await Group.create(req.body);

    // return error if group did not save
    if (!newGroup) {
      throw InternalServerError("Unable to create group");
    }

    // return successfull message and new group
    return res.status(201).send({
      status: true,
      message: "Group created",
      data: newGroup
    });
  } catch (error) {
    return res.status(error.status || 400).send({
      status: false,
      message: error.message
    });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntity("invalid group id");
    }
    const group = await Group.findOne({
      _id: id
    });

    if (!group) {
      throw new NotFound("Group not found");
    }
    return res.status(200).json({
      status: true,
      message: "Group retrived",
      data: group
    });
  } catch (error) {
    return res.status(error.status || 404).send({
      status: false,
      message: error.message
    });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const perPage = Number(req.query.perPage) || 50;
    const page = Number(req.query.page) || 1;

    // const jobs = await Job.find({ status : { $eq: 'Open'}})
    const groups = await Group.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!groups) {
      throw new NotFound("No group available");
    }

    const groupCount = groups.length;
    return res.status(200).json({
      success: true,
      data: {
        groups, page, perPage, groupCount
      },
      message: "Groups retrived"
    });
  } catch (error) {
    return res.status(error.status || 404).send({
      status: false,
      message: error.message
    });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = res.locals.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntity("invalid group id");
    }

    const joinTheGroup = await Group.findByIdAndUpdate(
      id, { $addToSet: { members: patientId } }
    );
    if (!joinTheGroup) {
      throw new InternalServerError("An error occured while trying to join a group, please try again");
    }

    return res.status(200).json({
      status: true,
      message: "patient successfully joined a group"
    });
  } catch (error) {
    return res.status(error.status || 404).send({
      status: false,
      message: error.message
    });
  }
};

exports.checkUserInGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user.id;

    if (!id) {
      throw new BadRequest("group id is missing");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntity("invalid group id");
    }
    const checkForUser = await Group.findOne({ _id: id, members: userId });
    if (!checkForUser) {
      throw new NotFound("User does not belong to the group chat");
    }
    return res.status(200).json({
      status: true,
      message: "user belongs to group"
    });
  } catch (error) {
    return res.status(error.status || 404).send({
      status: false,
      message: error.message
    });
  }
};
