const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure "uploads" folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// ➤ Add a new blood donor (POST)
router.post("/", upload.single("bloodReport"), (req, res) => {
    const { name, bloodType, contactNumber, location } = req.body;
    const bloodReport = req.file ? req.file.filename : null;

    if (!name || !bloodType || !contactNumber || !location || !bloodReport) {
        return res.status(400).json({ error: "❌ All fields are required." });
    }

    const query = `
        INSERT INTO blood_donors (name, blood_type, contact_number, location, blood_report) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [name, bloodType, contactNumber, location, bloodReport], (err, result) => {
        if (err) {
            console.error("❌ Error adding blood donor:", err);
            return res.status(500).json({ error: "❌ Failed to add blood donor." });
        }
        res.status(201).json({ message: "✅ Blood donor added successfully!" });
    });
});

// ➤ Fetch blood donors with search filters (GET)
router.get("/", (req, res) => {
    const { bloodType, location } = req.query;

    let query = "SELECT * FROM blood_donors WHERE 1=1";
    const queryParams = [];

    if (bloodType) {
        query += " AND blood_type = ?";
        queryParams.push(bloodType);
    }
    if (location) {
        query += " AND location LIKE ?";
        queryParams.push(`%${location}%`);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("❌ Error fetching blood donors:", err);
            return res.status(500).json({ error: "❌ Failed to fetch blood donors." });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
