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

// 📦 Auto-load UI Routes (nested-friendly)
const uiRoutesPath = path.join(__dirname, "routes", "ui");

function loadUiRoutes(basePath, parentRoute = "") {
  if (!fs.existsSync(basePath)) return;

  fs.readdirSync(basePath).forEach((file) => {
    const fullPath = path.join(basePath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Rekursif masuk folder
      loadUiRoutes(fullPath, path.join(parentRoute, file));
    } else if (file.endsWith(".routes.js")) {
      const route = require(fullPath);
      const routePath = path.join(parentRoute, file.replace(".routes.js", ""));
      const cleanRoutePath = routePath.replace(/\\/g, "/"); // cross-platform

      console.log(`✅ Loaded UI route: /${cleanRoutePath}`);
      app.use(`/${cleanRoutePath}`, route);
    }
  });
}

loadUiRoutes(uiRoutesPath);

// 🔌 Auto-load API Routes (recursive)
const loadApiRoutes = (dir, baseRoute = "") => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      // Rekursif jika folder
      const newBase = path.join(baseRoute, file);
      loadApiRoutes(fullPath, newBase);
    } else if (file.endsWith(".routes.js")) {
      const route = require(fullPath);
      const routeName = file.split(".")[0]; // gallery.routes.js => gallery
      const routePath = `/api/${path.join(baseRoute, routeName)}`.replace(/\\/g, "/");
      app.use(routePath, route);
      console.log(`✅ Loaded API route: ${routePath}`); //UNTUK MELIHAT HASIL ROUTES
    }
  });
};

loadApiRoutes(path.join(__dirname, "routes", "api"));


// 🏠 Root redirect
app.get("/", (req, res) => {
  res.redirect("/login");
});

// 🚀 Server run
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
