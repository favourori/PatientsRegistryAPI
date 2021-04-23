/* eslint-disable no-console */
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const patientRoute = require("./route/patient");
const userRoute = require("./route/users");

// setup body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// allowing cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

(async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: false
    };
    await mongoose.connect(process.env.DB_URL, options);
    console.log("connected to DB");
  } catch (err) {
    console.log(err.toString());
  }
})();

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server Up"
  });
});

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/patients", patientRoute);

// Spin up dev server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
