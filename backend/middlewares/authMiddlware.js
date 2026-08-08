const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../utilities/jwtSecret");

module.exports.authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).json({ error: "Please Login First" });
  } else {
    try {
      const decodedToken = await jwt.verify(
        accessToken,
        getJwtSecret(),
      );
      req.role = decodedToken.role;
      req.id = decodedToken.id;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Please Login Again" });
    }
  }
};
