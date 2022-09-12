import {STATUS_CODE_SUCCESS, STATUS_CODE_BAD_REQUEST} from "../frontend/src/common/constants.js";

const {
  createMatch,
  findMatchWith,
  deleteMatchWithId,
} = require("./utils/orm");

// Express
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

// Database
const db = require("./db");

db.sync({ force: true }) // TODO: need to remove this when in production
  .then(() => {
    console.log("Connection has been established successfully!");
  })
  .catch((error) => console.error("Unable to connect to the database:", error));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World from matching-service");
});

app.delete("/match/:id", async (req, res) => {
  const numOfRowDeleted = await deleteMatchWithId(req.params.id);

  if (numOfRowDeleted === 0) {
    res.json({ msg: "No match is deleted" });
  } else {
    res
      .status(STATUS_CODE_SUCCESS)
      .json({ msg: `Match ${req.params.id} deleted successfully!` });
  }
});

app.post("/match", async (req, res) => {
  const { difficulty, username } = req.body;
  // TODO: validate input
  const matchWhereUsername = await findMatchWith({ username });

  if (matchWhereUsername) {
    return res
      .status(STATUS_CODE_BAD_REQUEST)
      .json({ msg: "Cannot have multiple matches at the same time!" });
  }

  const match = await findMatchWith({ difficulty });

  if (match) {
    const room = match.room;
    await match.destroy();
    res.status(STATUS_CODE_SUCCESS).json({ msg: "Match found!", room, isMatch: true });
  } else {
    const { id, room } = await createMatch(difficulty, username);
    res
      .status(STATUS_CODE_SUCCESS)
      .json({ msg: "Finding a match for you!", id, room, isMatch: false });
  }
});

// HTTP server
const { createServer } = require("http");
const httpServer = createServer(app);
const PORT = process.env.PORT || 8001;

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Socket.io
const socketOptions = {
  cors: true,
};
const { Server } = require("socket.io");
const io = new Server(httpServer, socketOptions);
const {
  setRoomTimeout,
  clearRoomTimeout,
  deleteMatch,
} = require("./utils/socket");

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("matchWaiting", (data) => {
    const { room } = data;
    socket.join(room);

    setRoomTimeout(room, socket);
  });

  socket.on("matchFound", (data) => {
    const { room } = data;

    clearRoomTimeout(room);

    socket.join(room);
    io.to(room).emit("room", { room });
  });

  socket.on("disconnecting", () => {
    console.log("a user is disconnecting");

    deleteMatch(socket);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  socket.on("message", (data) => {
    console.log(data.msg);
  });
});
