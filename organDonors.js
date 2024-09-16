const express = require('express');
const OrganDonor = require('../models/OrganDonor'); // Make sure this path matches your project structure
const router = express.Router();

// Get all organ donors
router.get('/', async (req, res) => {
    try {
        const donors = await OrganDonor.find();
        res.json(donors);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new organ donor
router.post('/', async (req, res) => {
    try {
        const donor = new OrganDonor(req.body);
        await donor.save();
        res.status(201).json(donor);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get a specific organ donor by ID
router.get('/:id', async (req, res) => {
    try {
        const donor = await OrganDonor.findById(req.params.id);
        if (!donor) return res.status(404).send('Donor not found');
        res.json(donor);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update an organ donor by ID
router.put('/:id', async (req, res) => {
    try {
        const donor = await OrganDonor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!donor) return res.status(404).send('Donor not found');
        res.json(donor);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete an organ donor by ID
router.delete('/:id', async (req, res) => {
    try {
        const donor = await OrganDonor.findByIdAndDelete(req.params.id);
        if (!donor) return res.status(404).send('Donor not found');
        res.json({ message: 'Donor deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
