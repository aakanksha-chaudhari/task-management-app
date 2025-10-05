const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");
const Task = require("../models/Task");

router.get("/stats", async (req, res) => {
  try {
    const agentsCount = await Agent.countDocuments();
    const tasksCount = await Task.countDocuments();

    res.json({ agentsCount, tasksCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
