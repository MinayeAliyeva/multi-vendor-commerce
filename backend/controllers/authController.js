const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utilities/response");
const { createToken } = require("../utilities/tokenCreate");
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accesstoken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true, // JS oxuya bilməsin (təhlükəsizlik)
            secure: true, // HTTPS üçün
            sameSite: "strict", // CSRF qorunması
          });

          responseReturn(res, 200, {
            token,
            message: "Login Success",
          });
        } else {
          responseReturn(res, 401, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not faund" });
      }
    } catch (error) {
      console.log("ERROR:", error);
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new authControllers();
