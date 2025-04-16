const express = require("express");
const router = express.Router();
const { auth, loadSidebar } = require("../../middleware");
const UserlevelService = require("../../services/userlevel.service");
const UserService = require("../../services/user.service");

router.get("/", auth.ensureAuth, loadSidebar, async (req, res) => {
    try {
        const userlevel = await UserlevelService.getAllUserlevel();
        const users = await UserService.getAllUsers();

        res.render("home", {
            link: "userlevel/userlevel_list",
            jslink: "javascripts/userlevel_javascript.js",
            user: req.session.user,
            username: req.session.user?.username || "Guest",
            fullname: req.session.user?.fullname || "Guest",
            userlevel,
            users
        });
    } catch (error) {
        console.error("❌ Error loading userlevel", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;