const express = require("express");
const router = express.Router();
const db = require("../db");

// ➤ Book Appointment (User)
router.post("/", (req, res) => {
    const { user_name, hospital_id, date_time, reason } = req.body;
    const sql = "INSERT INTO appointments (user_name, hospital_id, date_time, reason) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [user_name, hospital_id, date_time, reason], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "✅ Appointment booked successfully" });
    });
});

// ➤ Get Appointments (Hospital View)
router.get("/", (req, res) => {
    db.query("SELECT * FROM appointments", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ➤ Accept/Reject Appointment (Hospital)
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.query("UPDATE appointments SET status = ? WHERE id = ?", [status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "✅ Appointment updated successfully" });
    });
});

module.exports = router; // Don't forget to export the router
