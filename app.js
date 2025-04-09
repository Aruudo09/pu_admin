const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// 🧠 Session setup
app.use(
  session({
    secret: "rahasia_kamu",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.static(path.join(__dirname, "public")));

// 🌐 Middleware untuk inject data user ke view
app.use((req, res, next) => {
  res.locals.username = req.session.user?.username || null;
  res.locals.fullname = req.session.user?.fullname || null;
  next();
});

// 📄 Parsing Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 📂 Static dan View
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔐 Auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

// 📦 Auto-load UI Routes
const uiRoutesPath = path.join(__dirname, "routes", "ui");
if (fs.existsSync(uiRoutesPath)) {
  fs.readdirSync(uiRoutesPath).forEach((file) => {
    if (file.endsWith(".routes.js")) {
      const route = require(path.join(uiRoutesPath, file));
      app.use("/", route); // tanpa prefix karena ini UI
    }
  });
}

// 🔌 Auto-load API Routes
const apiRoutesPath = path.join(__dirname, "routes", "api");
if (fs.existsSync(apiRoutesPath)) {
  fs.readdirSync(apiRoutesPath).forEach((file) => {
    if (file.endsWith(".routes.js")) {
      const route = require(path.join(apiRoutesPath, file));
      const routeName = file.split(".")[0]; // user.routes.js => user
      app.use(`/api/${routeName}`, route);
    }
  });
}

// 🏠 Root redirect
app.get("/", (req, res) => {
  res.redirect("/login");
});

// 🚀 Server run
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
