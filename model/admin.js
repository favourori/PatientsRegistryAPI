// this schema is for admin and researchers which are distinguished by role

/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { emailMessage } = require("../helpers/signupMessage");

const adminSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "researcher"]

    }
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    try {
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
    // Send welcome email
    // await emailMessage(this.email, this.firstname, this.verificationCode);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
