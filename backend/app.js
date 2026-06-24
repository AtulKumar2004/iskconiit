import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import paymentRoute from "./routes/paymentRoutes.js";
import sankirtanaRoutes from "./routes/sankirtanaRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import programRegistrationRoutes from "./routes/programRegistrationRoutes.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/sankirtana-request", sankirtanaRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/program-registrations", programRegistrationRoutes);
app.use("/api", paymentRoute);
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ISKCON IIT Bhubaneswar API Running",
  });
});
app.get("/api/getKey", (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
});

export default app;