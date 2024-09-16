const mongoose = require('mongoose');

// Define the schema for the hospital
const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        address: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        postalCode: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        }
    },
    contact: {
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        }
    },
    services: {
        type: [String], // Array of strings for services
        default: []
    },
    opHours: {
        type: Map,
        of: String,
        default: {}
    },
    departments: {
        type: [String], // Array of departments
        default: []
    },
    website: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,7}\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    emergencyNumber: {
        type: String,
        trim: true
    }
});

// Create and export the model
const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;
