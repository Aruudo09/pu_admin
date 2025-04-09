const express = require("express");
const userlevelController = require("../../controllers/api/userlevel.controller");

const router = express.Router();

router.get("/", userlevelController.getAllUserlevel);
router.get("/:id", userlevelController.getUserlevelById);
router.post("/", userlevelController.createUserlevel);
router.put("/:id", userlevelController.updateUserlevel);
router.delete("/:id", userlevelController.deleteUserlevel);

module.exports = router;
