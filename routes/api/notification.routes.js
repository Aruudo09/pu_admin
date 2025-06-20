const express = require("express");
const router = express.Router();
const userController = require("../../controllers/api/user.controller");

router.get('/pending', userController.getPendingUserNotifications);

module.exports = router;
