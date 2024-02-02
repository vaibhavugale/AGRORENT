const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token not found...",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode) {
      const ui = decode.userID
      const user = await User.findOne({ ui });
      req.body.user = user;

      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid token...",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, Return from middleware...",
    });
  }
};
