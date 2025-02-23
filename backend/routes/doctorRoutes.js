const express = require("express");
const router = express.Router();
const db = require("../db");

// Fetch all doctors
router.get("/", (req, res) => {
    const query = "SELECT * FROM doctors";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch doctors" });
        res.status(200).json(results);
    });
});

// Add a new doctor
router.post("/", (req, res) => {
    const { name, specialization, joining_date } = req.body;
    db.query("INSERT INTO doctors (name, specialization, joining_date) VALUES (?, ?, ?)", [name, specialization, joining_date], (err) => {
        if (err) return res.status(500).json({ error: "Failed to add doctor" });
        res.status(201).json({ message: "Doctor added successfully" });
    });
});

// Update doctor
router.put("/:id", (req, res) => {
    const { name, specialization, joining_date } = req.body;
    const { id } = req.params;
    db.query("UPDATE doctors SET name=?, specialization=?, joining_date=? WHERE id=?", [name, specialization, joining_date, id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to update doctor" });
        res.status(200).json({ message: "Doctor updated successfully" });
    });
});

// Delete doctor
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM doctors WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to delete doctor" });
        res.status(200).json({ message: "Doctor deleted successfully" });
    });
});

module.exports = router;
