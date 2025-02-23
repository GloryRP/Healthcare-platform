const express = require("express");
const router = express.Router();
const db = require("../db");

// ➤ Get All Ambulance Services (GET)
router.get("/", (req, res) => {
  const query = "SELECT * FROM ambulances";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching ambulances:", err);
      return res.status(500).json({ error: "❌ Failed to fetch ambulance services." });
    }
    res.status(200).json(results);
  });
});

// ➤ Add a New Ambulance Service (POST)
router.post("/", (req, res) => {
  const { service_name, location, contact_number, available } = req.body;

  if (!service_name || !location || !contact_number) {
    return res.status(400).json({ error: "❌ All fields are required." });
  }

  const query = `
    INSERT INTO ambulances (service_name, location, contact_number, available) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [service_name, location, contact_number, available || true], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return res.status(500).json({ error: "❌ Failed to add ambulance service." });
    }
    res.status(201).json({ message: "✅ Ambulance service added successfully!", id: result.insertId });
  });
});

// ➤ Handle Ambulance Requests (POST)
router.post("/request", (req, res) => {
  const { location, contact_number, details } = req.body;

  if (!location || !contact_number || !details) {
    return res.status(400).json({ error: "❌ All fields are required." });
  }

  const query = `
    INSERT INTO ambulance_requests (location, contact_number, details) 
    VALUES (?, ?, ?)
  `;

  db.query(query, [location, contact_number, details], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return res.status(500).json({ error: "❌ Failed to request ambulance." });
    }
    res.status(201).json({ message: "✅ Ambulance request submitted successfully!", id: result.insertId });
  });
});

module.exports = router;
