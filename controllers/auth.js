const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

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
  console.log("login" + ' ' + req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = await req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: { msg: "user not found" } });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("password incorrect");
    }

    console.log(user.condition);

    const payload = {
      user: {
        name: user.name,
        id: user.id,
        condition: user.condition,
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
        console.log(token);

        res.status(200).json(token);
      }
    );
  } catch (err) {
    console.log(err);
  }
};
