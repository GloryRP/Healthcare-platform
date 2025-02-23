const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const opdRoutes = require("./routes/opdRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const bloodDonorRoutes = require("./routes/bloodDonorRoutes");
const organDonorRoutes = require("./routes/organDonorRoutes");
const ambulanceRoutes = require("./routes/ambulanceRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register Routes
app.use("/api/opd-services", opdRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/blood-donors", bloodDonorRoutes);
app.use("/api/organ-donors", organDonorRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Medical Service Portal Backend Running");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
