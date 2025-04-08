const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes"); // Import file routes

const app = express();

// Middleware
app.use(cors()); // Mengizinkan CORS (opsional)
app.use(bodyParser.json()); // Parsing request body JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parsing form data

// Routes
app.use("/api/users", userRoutes); // Gunakan router user

// Route default
app.get("/", (req, res) => {
  res.send("Welcome to the Express API!");
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.listen(3000, '0.0.0.0', () => {
//     console.log('Server running on port 3000 and accessible on the network');
//   });