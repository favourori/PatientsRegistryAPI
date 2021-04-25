/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    members: {
      type: Array,
      required: false
    }
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
