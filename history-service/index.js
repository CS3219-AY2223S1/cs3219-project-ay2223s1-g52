const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

// Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

// Routes
app.get("/", (req, res) => {
  res.send({ message: "Welcome to History Service!" });
});
app.use("/api/historyService/history", require("./routes/historyRoutes"));

// Error handling
app.use(errorHandler);

// DB
connectDB();

// HTTP Server
const httpServer = createServer(app);
const PORT = process.env.PORT || 8004;

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));
