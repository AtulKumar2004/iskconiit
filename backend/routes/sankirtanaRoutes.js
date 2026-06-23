import express from "express";
const router = express.Router();

// Placeholder route to prevent server crash
router.get("/", (req, res) => {
  res.json({ message: "Sankirtana routes placeholder" });
});

export default router;
