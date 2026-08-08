const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const { dbConnect } = require("./utilities/db");
const authRoutes = require("./routes/authRoutes")
require("dotenv").config();

const app = express();

app.set("trust proxy", 1);

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => res.send("My backend"));
app.get("/api/health", (req, res) =>
  res.status(200).json({
    status: "ok",
    socket: "enabled",
  }),
);
app.use("/api", authRoutes);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

const activeSellers = new Map();
const activeCustomers = new Map();
let activeAdmin = null;

const emitActiveUsers = () => {
  io.emit("activeSeller", Array.from(activeSellers.values()));
  io.emit("activeCustomer", Array.from(activeCustomers.values()));
};

io.on("connection", (socket) => {
  socket.on("add_seller", (sellerId, sellerInfo) => {
    if (!sellerId) return;
    activeSellers.set(sellerId, { sellerId, socketId: socket.id, sellerInfo });
    emitActiveUsers();
  });

  socket.on("add_customer", (customerId, customerInfo) => {
    if (!customerId) return;
    activeCustomers.set(customerId, {
      customerId,
      socketId: socket.id,
      customerInfo,
    });
    emitActiveUsers();
  });

  socket.on("add_admin", (adminInfo) => {
    activeAdmin = { socketId: socket.id, adminInfo };
    emitActiveUsers();
  });

  socket.on("send_message_seller_to_admin", (message) => {
    if (activeAdmin?.socketId) {
      io.to(activeAdmin.socketId).emit("receved_seller_message", message);
    }
  });

  socket.on("send_message_admin_to_seller", (message) => {
    const seller = activeSellers.get(message?.receverId);
    if (seller?.socketId) {
      io.to(seller.socketId).emit("receved_admin_message", message);
    }
  });

  socket.on("send_seller_message", (message) => {
    const customer = activeCustomers.get(message?.receverId);
    if (customer?.socketId) {
      io.to(customer.socketId).emit("seller_message", message);
    }
  });

  socket.on("send_customer_message", (message) => {
    const seller = activeSellers.get(message?.receverId);
    if (seller?.socketId) {
      io.to(seller.socketId).emit("customer_message", message);
    }
  });

  socket.on("disconnect", () => {
    for (const [sellerId, seller] of activeSellers) {
      if (seller.socketId === socket.id) {
        activeSellers.delete(sellerId);
      }
    }

    for (const [customerId, customer] of activeCustomers) {
      if (customer.socketId === socket.id) {
        activeCustomers.delete(customerId);
      }
    }

    if (activeAdmin?.socketId === socket.id) {
      activeAdmin = null;
    }

    emitActiveUsers();
  });
});

async function startServer() {
  await dbConnect(); // connection açılmasını gözləyirik
  console.log("Connected to DB:", mongoose.connection.name);

  server.listen(port, () => console.log(`Server is running on port ${port}`));
}

startServer();
