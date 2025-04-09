const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");
const loadSidebar = require("../../middleware/loadSidebar"); // ✅

router.get("/home", ensureAuth, loadSidebar, (req, res) => {
  res.render("home", {
    link: "index", // nama partial konten
    jslink: "javascripts/javascript.js", // jika kamu load JS eksternal
    user: req.session.user,
    username: req.session.user?.username || "Guest",
    fullname: req.session.user?.fullname || "Guest",
  });
});


module.exports = router;
