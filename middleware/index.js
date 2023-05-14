const jwt = require("jsonwebtoken");
const config = require("config");



exports.auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    console.log(token);

    if (!token) {
      return res.status(401).json("authorization denied, no signed token");
    }
    console.log(config.get("jwtSecret"));
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    return next();
  } catch (err) {
    console.log(err);
    res.status(401).json("authorization denied");
  }
};
