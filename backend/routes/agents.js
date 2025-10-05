const express = require("express");
const bcrypt = require("bcrypt");
const Agent = require("../models/Agent");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });

    await agent.save();
    res.status(201).json({ message: "Agent added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
