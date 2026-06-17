const express = require("express");
const router = express.Router();

// Placeholder route to prevent server crash
router.get("/", (req, res) => {
  res.json({ message: "Sankirtana routes placeholder" });
});

module.exports = router;
