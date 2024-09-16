const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
const app = express();
const port = 3000; // Or any port you prefer

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/healthcarePlatform', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit process if connection fails
  });

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS

// Routes
const organDonorRoutes = require('./routes/organDonors');
const bloodDonorRoutes = require('./routes/bloodDonors');
const patientRoutes = require('./routes/patients');

// Add /api prefix to route paths
app.use('/api/organDonors', organDonorRoutes);
app.use('/api/bloodDonors', bloodDonorRoutes);
app.use('/api/patients', patientRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Healthcare Platform API');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
