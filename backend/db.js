// backend/db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",          // Use "localhost" if MySQL is local
  user: "root",               // Your MySQL username
  password: "root",  // Replace with your MySQL password
  database: "healthcare_db",  // Ensure database name is correct
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});

module.exports = connection;
