const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, default: "admin" },
  role: { type: String, required: true },
});

module.exports = model('admins', adminSchema);
