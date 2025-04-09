const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const userRoutes = require("./routes/user.routes"); // Import file routes
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(cors()); // Mengizinkan CORS (opsional)
app.use(bodyParser.json()); // Parsing request body JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parsing form data

// Routes
// app.use("/api/users", userRoutes); // Gunakan router user
// Auto-import routes
const routesPath = path.join(__dirname, "routes");

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".routes.js")) {
    const route = require(path.join(routesPath, file));
    
    // Buat prefix otomatis dari nama file: "user.routes.js" => "user"
    const routeName = file.split(".")[0]; // ambil 'user' dari 'user.routes.js'
    app.use(`/api/${routeName}`, route);
  }
});

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