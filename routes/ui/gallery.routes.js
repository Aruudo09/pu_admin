const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");
const loadSidebar = require("../../middleware/loadSidebar");
const GalleryService = require("../../services/galleries/gallery.service");

// TAMPILAN LIST
router.get("/", ensureAuth, loadSidebar, async (req, res) => {
  try {
    const galleries = await GalleryService.getAllGallery();

    res.render("home", {
      link: "galleries/gallery_list",
      jslink: "javascripts/gallery_javascript.js",
      user: req.session.user,
      username: req.session.user?.username || "Guest",
      fullname: req.session.user?.fullname || "Guest",
      galleries,
    });
  } catch (error) {
    console.error("❌ Error loading gallery:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// TAMPILAN FORM
router.get("/form", ensureAuth, loadSidebar, async (req, res) => {
  res.render("home", {
    link: "galleries/gallery_form",
    jslink: "javascript/gallery_javascript.js",
    user: req.session.user,
    username: req.session.user?.username || "Guest",
    fullname: req.session.user?.fullname || "Guest",
  });
});


module.exports = router;
