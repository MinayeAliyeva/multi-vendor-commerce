const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("./jwtSecret");

module.exports.createToken = async (data) => {
  const token = await jwt.sign(data, getJwtSecret(), {
    expiresIn: "7d",
  });
  return token;
};
