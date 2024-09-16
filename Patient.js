const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
    diagnosis: {
        type: String,
        required: true
    },
    contactInfo: {
        phone: String,
        email: String
    },
    dateAdmitted: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patient', patientSchema);
