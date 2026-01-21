const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utilities/db");
const authRoutes = require("./routes/authRoutes")
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => res.send("My backend"));
app.use("/api", authRoutes);

const port = process.env.PORT || 8080;

async function startServer() {
  await dbConnect(); // connection açılmasını gözləyirik
  console.log("Connected to DB:", mongoose.connection.name);

  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

startServer();
