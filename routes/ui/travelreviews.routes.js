const express = require("express");
const router = express.Router();
const { auth, loadSidebar } = require("../../middleware");
const TravelReviews = require("../../services/travelreviews.service");

// TAMPILAN LIST
router.get("/", auth.ensureAuth, loadSidebar, async (req, res) => {
  try {
    const travelReviews = await TravelReviews.getAllTravelReviews();

    res.render("home", {
      link: "travelreviews/travelreviews_list",
      jslink: "javascripts/travelreviews_javascript.js",
      user: req.session.user,
      username: req.session.user?.username || "Guest",
      fullname: req.session.user?.fullname || "Guest",
      travelReviews
    });
  } catch (error) {
    console.error("❌ Error loading travel reviews:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// // TAMPILAN FORM
// router.get("/form", auth.ensureAuth, loadSidebar, async (req, res) => {
//   res.render("home", {
//     link: "travelreviews/travelreviews_form",
//     jslink: "javascripts/travelreviews_javascript.js",
//     user: req.session.user,
//     username: req.session.user?.username || "Guest",
//     fullname: req.session.user?.fullname || "Guest",
//   });
// });

module.exports = router;
