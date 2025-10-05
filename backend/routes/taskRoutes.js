const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const Task = require("../models/Task");
const Agent = require("../models/Agent");

const upload = multer({ dest: "uploads/" });

async function distributeTasks(tasks) {
  const agents = await Agent.find();
  if (agents.length === 0) throw new Error("No agents found");

  const distributed = tasks.map((task, idx) => ({
    firstName: task.firstName,
    phone: task.phone,
    notes: task.notes,
    assignedAgent: agents[idx % agents.length]._id
  }));

  const savedTasks = await Task.insertMany(distributed);
  return savedTasks;
}

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const ext = req.file.originalname.split(".").pop().toLowerCase();
    let tasks = [];

    if (ext === "csv") {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (row) => {
          if (row.FirstName && row.Phone) {
            tasks.push({
              firstName: row.FirstName,
              phone: row.Phone,
              notes: row.Notes || ""
            });
          }
        })
        .on("end", async () => {
          fs.unlinkSync(req.file.path);
          const distributed = await distributeTasks(tasks);
          const populated = await Task.find({
            _id: { $in: distributed.map((t) => t._id) }
          }).populate("assignedAgent", "name email");
          res.json({ success: true, tasks: populated });
        });
    } else if (ext === "xlsx" || ext === "xls") {
      const workbook = xlsx.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet);

      tasks = data
        .filter((row) => row.FirstName && row.Phone)
        .map((row) => ({
          firstName: row.FirstName,
          phone: row.Phone,
          notes: row.Notes || ""
        }));

      fs.unlinkSync(req.file.path);
      const distributed = await distributeTasks(tasks);
      const populated = await Task.find({
        _id: { $in: distributed.map((t) => t._id) }
      }).populate("assignedAgent", "name email");
      res.json({ success: true, tasks: populated });
    } else {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ msg: "Invalid file type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
