const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (msg) => new Promise((resolve, reject) => {
  try {
    return sgMail
      .send(msg)
      .then((response) => resolve(response))
      .catch((error) => reject(error.response.body));
  } catch (error) {
    return reject(error);
  }
});

module.exports = {
  sendEmail
};
