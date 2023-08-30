const User = require("../models/User");
const { validationResult } = require("express-validator");
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
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(404).json({ error: { msg: "user not found" } });

    const bytes = await crypto.randomBytes(32);

    const passwordToken = bytes.toString("hex");
    const tokenExpiration = Date.now() + 3600000;

    user.resetToken = passwordToken;
    user.tokenExpiration = tokenExpiration;

    const tokenedUser = await user.save();

    if (!tokenedUser)
      return res.status(500).json({ data: { error: { msg: "server error" } } });

    mailer.sendMail(
      {
        from: "noreply@healthmate.com",
        to: email,
        subject: "HealthMate Password Reset",
        html: `<!DOCTYPE html>
        <html lang="en">
          <body>
            <style>
              div {
                padding: 20px;
                color: #333;
              }
              .jumbotron {
                background: #ddd;
                padding: 20px;
                border-radius: 5px;
              }
              h1 {
                text-align: center;
              }
              p {
                text-align: center;
                font-size: 18px;
              }
              a {
                display: block;
                text-align: center;
                padding: 10px;
                background: #333;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                cursor: pointer;
                margin: 0 auto;
                transition: all 0.5s;
        
              }
              a:hover {
                background: #555;
                color: #fff;
                font-size: 12px;
                width: 70%;
              }
            </style>
            <div>
              <div class="jumbotron">
                <h1>HealthMate</h1>
                <p>Reset Password</p>
              </div>
              <p>
                You requested to reset your password, if this was you follow this link
                to reset your password, else just ignore.
              </p>
              <a
                target="_blank"
                href="http://localhost:5173/reset-password/${passwordToken}"
                >Click to Reset Password</a
              >
            </div>
          </body>
        </html>
        `,
      },
      (data, err) => {
        if (err) {
          console.log("error" + err);
          return res.status(500).json({
            error: { msg: `${err.message} => Please check your network` },
          });
        }
        console.log(data);
        if (data.errno)
          return res
            .status(500)
            .json({ error: { msg: "please check your network!" } });
        res.status(200).json({
          success: {
            msg: "A password reset link has been sent to your email, please check your mailbox",
            data: data,
          },
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: { msg: err.message, data: err } });
    console.log(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { token, newPassword } = req.body.data;

    console.log(typeof token);

    const user = await User.findOne({
      resetToken: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user)
      return res.status(404).json({
        errors: [
          {
            msg: "Please begin process from begining, reset token expired or user not found!",
          },
        ],
      });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    user.password = password;

    user.resetToken = null;
    user.tokenExpiration = null;
    await user.save();
    console.log(user);

    res.status(200).json({ success: { msg: "Password changed Successfully" } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: [{ msg: err.message }] });
  }
};
