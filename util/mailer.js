const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("email_username"),
    password: config.get("email_password"),
  },
});

exports.sendMail = (options, callback) => {
  transporter.sendMail(options, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
};
