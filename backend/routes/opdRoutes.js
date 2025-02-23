const express = require("express");
const router = express.Router();
const db = require("../db");

// ➤ Get All OPD Services (GET)
router.get("/", (req, res) => {
    const query = "SELECT * FROM opd_services";
    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching OPD services:", err);
            return res.status(500).json({ error: "Failed to fetch OPD services." });
        }
        res.status(200).json(results);
    });
});

// ➤ Add a New OPD Service (POST)
router.post("/", (req, res) => {
    const { hospital_id, service_name, available } = req.body;
    if (!hospital_id || !service_name) {
        return res.status(400).json({ error: "Hospital ID and Service Name are required." });
    }

    const query = "INSERT INTO opd_services (hospital_id, service_name, available) VALUES (?, ?, ?)";
    db.query(query, [hospital_id, service_name, available || true], (err, result) => {
        if (err) {
            console.error("❌ Error adding OPD service:", err);
            return res.status(500).json({ error: "Failed to add OPD service." });
        }
        res.status(201).json({ message: "✅ OPD service added successfully!", id: result.insertId });
    });
});

// ➤ Update OPD Service (PUT)
router.put("/:id", (req, res) => {
    const { service_name, available } = req.body;
    const { id } = req.params;

    if (!service_name) {
        return res.status(400).json({ error: "Service name is required." });
    }

    const query = "UPDATE opd_services SET service_name = ?, available = ? WHERE id = ?";
    db.query(query, [service_name, available, id], (err) => {
        if (err) {
            console.error("❌ Error updating OPD service:", err);
            return res.status(500).json({ error: "Failed to update OPD service." });
        }
        res.status(200).json({ message: "✅ OPD service updated successfully!" });
    });
});

// ➤ Delete OPD Service (DELETE)
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM opd_services WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) {
            console.error("❌ Error deleting OPD service:", err);
            return res.status(500).json({ error: "Failed to delete OPD service." });
        }
        res.status(200).json({ message: "✅ OPD service deleted successfully!" });
    });
});

module.exports = router;
