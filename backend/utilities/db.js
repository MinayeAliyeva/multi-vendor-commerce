const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
};

// useNewUrlParser: true
// "Connection string-i oxumaq üçün yeni parser-i istifadə et."
