const response = require("../../utils/response");
const travelReviewService = require("../../services/travelreview.service");

class TravelReviewController {
  async getAllTravelReviews(req, res) {
    try {
      const reviews = await travelReviewService.getAllTravelReviews();
      return response.success(res, "All travel reviews fetched", reviews);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async getTravelReviewById(req, res) {
    try {
      const review = await travelReviewService.getTravelReviewById(req.params.id);
      return response.success(res, "Travel review fetched", review);
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }

  async createTravelReview(req, res) {
    try {
      const newReview = await travelReviewService.createTravelReview(req.body);
      return response.success(res, "Travel review created", newReview);
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async updateTravelReview(req, res) {
    try {
      await travelReviewService.updateTravelReview(req.params.id, req.body);
      return response.success(res, "Travel review updated successfully");
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async deleteTravelReview(req, res) {
    try {
      await travelReviewService.deleteTravelReview(req.params.id);
      return response.success(res, "Travel review deleted successfully");
    } catch (error) {
      res.status(404).json({ message: error.message });
      return response.notFound(res, error.message);
    }
  }
}

module.exports = new TravelReviewController();
