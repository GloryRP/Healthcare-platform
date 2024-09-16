const mongoose = require('mongoose');

// Define the schema for blood donors
const bloodDonorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bloodType: { type: String, required: true },
    contactNumber: { type: String, required: true },
    location: { type: String, required: true },
});

// Create and export the model, specifying the collection name explicitly
module.exports = mongoose.model('BloodDonor', bloodDonorSchema, 'bloodDonors');
