const express = require("express");
const router = express.Router();
const { auth, loadSidebar } = require("../../middleware");
const MenuService = require("../../services/menu.service");

// TAMPILAN LIST
router.get("/", auth.ensureAuth, loadSidebar, async (req, res) => {
    try {
        const menu = await MenuService.getAllMenu();

        res.render("home", {
            link: "menu/menu_list",
            jslink: "javascripts/javascript.js",
            user: req.session.user,
            username: req.session.user?.usernmae || "Guest",
            fullname: req.session.user?.fullname || "Guest",
            menu
        });  
    } catch (error) {
        console.log("❌ Error loading gallery:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;