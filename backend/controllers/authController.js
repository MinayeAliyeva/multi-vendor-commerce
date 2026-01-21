const adminModel = require("../models/adminModel");
const mongoose = require("mongoose");
const { responseReture } = require("../utilities/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utilities/tokenCreate");
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      console.log("admin", admin);
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        console.log("match", match);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accesstoken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60860 * 1000),
          });
          console.log("token", token);
          responseReture(res, 200, { message: "Login Success" });
        } else {
          responseReture(res, 404, { error: "Password Wrong" });
        }
      } else {
        responseReture(res, 404, { error: "Email not faund" });
      }
    } catch (error) {
      console.log("ERROR:", error);
      responseReture(res, 500, { error: error.message });
    }
  };
}

module.exports = new authControllers();
