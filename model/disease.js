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
    },
 
  },
  { timestamps: true }
);

patientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    try {
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
    // Send welcome email
    await emailMessage(this.email, this.firstname, this.verificationCode);
  }
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
