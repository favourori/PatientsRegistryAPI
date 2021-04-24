/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    synonyms: {
      type: Array,
      required: false
    },
    symptoms: {
      type: String,
      required: true
    },
    causes: {
      type: String,
      required: false
    }

  },
  { timestamps: true }
);

const Disease = mongoose.model("Disease", diseaseSchema);

module.exports = Disease;
