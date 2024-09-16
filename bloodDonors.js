const express = require('express');
const router = express.Router();
const BloodDonor = require('../models/BloodDonor'); // Import the BloodDonor model

// GET all blood donors
router.get('/', async (req, res) => {
    try {
        const donors = await BloodDonor.find();  // Use the BloodDonor model to fetch data
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new blood donor
router.post('/', async (req, res) => {
    const bloodDonor = new BloodDonor({
        name: req.body.name,
        bloodType: req.body.bloodType,
        contactNumber: req.body.contactNumber,
        location: req.body.location
    });

    try {
        const newDonor = await bloodDonor.save();
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
