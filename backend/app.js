require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const sankirtanaRoutes = require(
  "./routes/sankirtanaRoutes"
);

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(
  "/api/sankirtana-request",
  sankirtanaRoutes
);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message:
      "ISKCON IIT Bhubaneswar API Running",
  });
});

module.exports = app;