const express = require("express");
const travelController = require("../../controllers/api/travel.controller");

const router = express.Router();

router.get("/", travelController.getAllTravels);
router.get("/:id", travelController.getTravelById);
router.post("/", travelController.createTravel);
router.put("/:id", travelController.updateTravel);
router.delete("/:id", travelController.deleteTravel);

module.exports = router;
