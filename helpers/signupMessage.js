const {
  InternalServerError
} = require("http-errors");
const { sendEmail } = require("./emailHelpers");

const emailMessage = async (email, firstname, code) => {
  const msg = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Patient registry Platform welcome message",
    text: "Patient registry welcome message and account verification",
    html: `
    <p> Hello <b> ${firstname} </b>, welcome to patient registry, Please use this 4 digit code to verify your account </p>
    <h1> ${code} </h1> 
    `
  };

  await sendEmail(msg).then((response) => {
    console.log("Email sent successfully", response);
  }).catch((error) => {
    throw new InternalServerError(error.message);
  });
};

module.exports = { emailMessage };
