const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");
const Task = require("../models/Task");

// Get all agents
router.get("/agents", async (req, res) => {
  try {
    const agents = await Agent.find({}, "name email phone");
    res.json({ success: true, agents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete agent by ID
router.delete("/agents/:id", async (req, res) => {
  try {
    const agentId = req.params.id;
    await Agent.findByIdAndDelete(agentId);
    res.json({ success: true, msg: "Agent deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate("assignedAgent", "name email");
    res.json({ success: true, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
