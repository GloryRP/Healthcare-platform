const express = require("express");
const router = express.Router();
const db = require("../db");

// ➤ Add a new organ donor (POST)
router.post("/", (req, res) => {
  const { name, organ_type, contact_number, location } = req.body;

  if (!name || !organ_type || !contact_number || !location) {
    return res.status(400).json({ error: "❌ All fields are required." });
  }

  const query = `
    INSERT INTO organ_donors (name, organ_type, contact_number, location) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, organ_type, contact_number, location], (err, result) => {
    if (err) {
      console.error("❌ Database insert error:", err);
      return res.status(500).json({ error: "❌ Failed to add organ donor." });
    }
    res.status(201).json({
      message: "✅ Organ donor added successfully!",
      id: result.insertId,
    });
  });
});

// ➤ Fetch all organ donors (GET)
router.get("/", (req, res) => {
  const query = "SELECT * FROM organ_donors";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching organ donors:", err);
      return res.status(500).json({ error: "❌ Failed to fetch organ donors." });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
