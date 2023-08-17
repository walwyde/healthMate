const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const crypto = require("crypto");
const mailer = require("../util/mailer");

exports.getIndex = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ errors: [{ msg: "user not found" }] });
    }

    res.status(200).json(user);
  } catch (err) {
    if (err) res.status("500").send([{ errors: "server error" }]);
    console.log(err.message);
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = await req.body;

    const activeUser = await User.findOne({ email });

    if (!activeUser) {
      return res.status(404).json({ errors: [{ msg: "user not found" }] });
    }

    const isMatch = await bcrypt.compare(password, activeUser.password);

    if (!isMatch) {
      return res.status(400).send({ errors: [{ msg: "password incorrect" }] });
    }

    const payload = {
      user: {
        name: activeUser.name,
        id: activeUser._id,
        condition: { ...activeUser.condition },
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.log(err);
        }

        res.status(200).json(token);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ errors: [{ error: err }] });
  }
};

exports.generateToken = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(404).json({ error: { msg: "user not found" } });

    const bytes = crypto.randomBytes(32);

    const passwordToken = bytes.toString("hex");
    const tokenExpiration = Date.now() + 3600;

    user.resetToken = passwordToken;
    user.tokenExpiration = tokenExpiration;

    const tokenedUser = await user.save();

    if (!tokenedUser)
      return res.status(500).json({ error: { msg: "server error" } });

    mailer.sendMail(
      {
        from: "noreply@healthmate.com",
        to: email,
        subject: "Reset Password Verification Link",
        html: `<div><h3>Reset Password</h3><p>You requested to reset your password, if this was you follow this link to reset your password, else just ignore</p><a hrf=http://localhost:3000/reset-password/${passwordToken}>Reset Password</a></div>`,
      },
      (err, data) => {
        if (err) console.log(err);
        res.status(200).json({
          success: {
            msg: "Token created and a password reset link has been sent to your email",
            status: data,
          },
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: { msg: "Server error", data: err } });
    console.log(er);
  }
};
