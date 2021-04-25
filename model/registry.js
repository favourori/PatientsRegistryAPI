const mongoose = require("mongoose");

const { Schema } = mongoose;

const registrySchema = Schema({
  disease: { type: Schema.Types.ObjectId, ref: "Disease", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true }
});

module.exports = mongoose.model("Registry", registrySchema);
