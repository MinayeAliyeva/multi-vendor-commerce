module.exports.getJwtSecret = () => {
  const secret =
    process.env.JWT_SECRET_KEY || process.env.SECRET_KEY || process.env.SECRET;

  if (!secret) {
    throw new Error("JWT secret is not configured");
  }

  return secret;
};
