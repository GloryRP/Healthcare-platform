const express = require('express');
const Patient = require('../models/Patient'); // Make sure this path matches your project structure
const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new patient
router.post('/', async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get a specific patient by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).send('Patient not found');
        res.json(patient);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Update a patient by ID
router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) return res.status(404).send('Patient not found');
        res.json(patient);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a patient by ID
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) return res.status(404).send('Patient not found');
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
