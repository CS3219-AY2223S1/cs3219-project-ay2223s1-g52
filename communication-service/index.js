require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const port = process.env.PORT || 8004;
const chatServer = require("http").createServer(app);
const adminName = "Admin";
const STATUS_CODE_SUCCESS = 200;
const PREFIX_COMMUNICATION_SVC = "/api/communication/";
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/chatUsers");

const io = new Server(chatServer, { cors: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res
    .status(STATUS_CODE_SUCCESS)
    .json({ status: "success", data: "Chat Microservice is running." });
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomId }) => {
    console.log(username + " joined room");
    const user = userJoin(socket.id, username, roomId);
    socket.join(user.roomId);
    //console.log(`this is the room id on index side: ${user.roomId}`);
    // send users and room info
    io.to(user.roomId).emit("roomUsers", {
      roomId: user.roomId,
      users: getRoomUsers(user.roomId),
    });
  });

  //listen for chat message
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.roomId).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      // send users and room info
      io.to(user.roomId).emit("roomUsers", {
        roomId: user.roomId,
        users: getRoomUsers(user.roomId),
      });
    }
  });
});

chatServer.listen(port, () => {
  console.log(`Comms service listening to port ${port}`);
});

module.exports = chatServer;
