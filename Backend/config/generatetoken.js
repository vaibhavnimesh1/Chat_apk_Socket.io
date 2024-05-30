const jwt = require("jsonwebtoken");
const SECRET_JWT = "secret";

const generateToken = (id) => {
  return  jwt.sign({ id }, SECRET_JWT, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
