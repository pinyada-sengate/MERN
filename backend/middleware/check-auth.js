const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // Authorization: "Barer token"
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed");
    }

    const decodedToken = jwt.verify(token, keys.tokenPrivateKey);
    req.userData = { userId: decodedToken.userId };
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
