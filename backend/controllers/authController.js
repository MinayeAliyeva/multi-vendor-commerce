const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utilities/response");
const { createToken } = require("../utilities/tokenCreate");

const getCookieOptions = (req) => {
  const isHttps =
    req.secure || req.headers["x-forwarded-proto"] === "https";

  return {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isHttps,
    sameSite: isHttps ? "none" : "lax",
  };
};

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
          res.cookie("accessToken", token, getCookieOptions(req));

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
  //end method

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      }else{
        console.log("Seller Info");
        responseReturn(res, 403, { error: "Seller Info" });
      }
    } catch (error) {
      console.log("ERROR:", error.message);
      responseReturn(res, 500, { error: error.message });
    }
  };
  //end method
}

module.exports = new authControllers();
