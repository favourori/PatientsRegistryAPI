/* eslint-disable no-underscore-dangle */
const {
    InternalServerError,
    NotFound,
    UnprocessableEntity
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
  
//   exports.getDiseases = async (req, res) => {
//     try {
//       const perPage = Number(req.query.perPage) || 50;
//       const page = Number(req.query.page) || 1;
  
//       // const jobs = await Job.find({ status : { $eq: 'Open'}})
//       const diseases = await Disease.find()
//         .skip((page - 1) * perPage)
//         .limit(perPage)
//         .exec();
  
//       if (!diseases) {
//         throw new NotFound("No Disease available");
//       }
  
//       const diseaseCount = diseases.length;
//       return res.status(200).json({
//         success: true,
//         data: {
//           diseases, page, perPage, diseaseCount
//         },
//         message: "Diseases retrived"
//       });
//     } catch (error) {
//       return res.status(error.status || 404).send({
//         status: false,
//         message: error.message
//       });
//     }
//   };
  
//   exports.editDisease = async (req, res) => {
  
//   };
  