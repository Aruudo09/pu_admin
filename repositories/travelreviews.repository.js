const { TravelReview } = require("../models");

class TravelReviewRepository {
  async getAllTravelReviews() {
    return await TravelReview.findAll();
  }

  async getTravelReviewById(id) {
    return await TravelReview.findByPk(id);
  }

  async createTravelReview(reviewData) {
    return await TravelReview.create(reviewData);
  }

  async updateTravelReview(id, reviewData) {
    return await TravelReview.update(reviewData, { where: { id } });
  }

  async deleteTravelReview(id) {
    return await TravelReview.destroy({ where: { id } });
  }
}

module.exports = new TravelReviewRepository();
