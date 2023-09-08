const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require('http');
const { Server } = require("socket.io");

// Import routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const requestRoute = require("./routes/request");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "DELETE"],
  },
});

// const port = process.env.PORT || 8000;

// // User management for socket.io
// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   if (!onlineUsers.some((user) => user.username === username)) {
//     onlineUsers.push({ username, socketId });
//   }
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };

// io.on('connection', (socket) => {
//   socket.on("Login", (username) => {
//     console.log('User logged in!', socket.id);
//     addNewUser(username, socket.id);
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });

//   socket.on("send_request", (data) => {
//     socket.broadcast.emit("receive_request", data);
//     console.log(data);
//   });

//   socket.on("send_notification", (data) => {
//     socket.broadcast.emit("receive_notification", data);
//     console.log(data);
//   });
// });

// server.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}`);
// });

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
dotenv.config();

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to MongoDB");
});

// ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/request", requestRoute);
