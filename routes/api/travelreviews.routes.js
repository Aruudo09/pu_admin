const express = require("express");
const travelReviewController = require("../../controllers/api/travelreviews.controller");

const router = express.Router();

router.get("/", travelReviewController.getAllTravelReviews);
router.get("/:id", travelReviewController.getTravelReviewById);
router.post("/", travelReviewController.createTravelReview);
router.put("/:id", travelReviewController.updateTravelReview);
router.delete("/:id", travelReviewController.deleteTravelReview);

module.exports = router;
