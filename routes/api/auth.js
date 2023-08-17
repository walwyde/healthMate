const express = require("express")
const router = express.Router()
const { check, validationResult} = require("express-validator")
const nodemailer = require("nodemailer");
const transport = require("sendgrid")


const controller = require("../../controllers/auth")
const auth = require("../../middleware/index")



router.get('/', auth.auth , controller.getIndex)

router.post('/',[
  check("email", "please enter a valid email").isEmail(),
  check("password", "please try that again").isLength({min: 6})
], controller.login)

router.post("/reset-password-token", controller.generateToken)

module.exports = router