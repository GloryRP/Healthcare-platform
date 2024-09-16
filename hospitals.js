// backend/routes/hospitals.js

const express = require('express');
const Hospital = require('../../models/models/Hospital');
const router = express.Router();

// Get all hospitals
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new hospital
router.post('/', async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update a hospital
router.put('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hospital) return res.status(404).send('Hospital not found');
    res.json(hospital);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a hospital
router.delete('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).send('Hospital not found');
    res.json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
