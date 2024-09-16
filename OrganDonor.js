const mongoose = require('mongoose');

const organDonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    organsAvailable: {
        type: [String], // An array of organ names (e.g., ['kidney', 'liver'])
        required: true
    },
    contactInfo: {
        phone: String,
        email: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('OrganDonor', organDonorSchema);
