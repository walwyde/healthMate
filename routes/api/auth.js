const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const transport = require("sendgrid");

const controller = require("../../controllers/auth");
const auth = require("../../middleware/index");

router.get("/", auth.auth, controller.getIndex);

router.post(
  "/",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "please try that again").isLength({ min: 6 }),
  ],
  controller.login
);

router.post("/reset-password-token", controller.generateToken);

router.post(
  "/reset-password",
  [
    check(
      "data.newPassword",
      "Password must be greater than 6 characters!"
    ).isLength({ min: 6 }),
    check("data.confirmNewPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be greater than 6 characters")
      .custom((value, { req }) => {
        if (value !== req.body.data.newPassword) {
          throw new Error("passwords do not match!");
        }
        return true;
      }),
  ],
  controller.resetPassword
);

module.exports = router;
