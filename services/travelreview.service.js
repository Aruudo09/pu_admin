const TravelReviewRepository = require("../repositories/travelreviews.repository");

class TravelReviewService {
  async getAllTravelReviews() {
    try {
      const reviews = await TravelReviewRepository.getAllTravelReviews();
      if (reviews.length === 0) {
        throw new Error("No travel reviews found"); // Menangani kasus data kosong
      }
      return reviews;
    } catch (error) {
      throw new Error(error.message); // Melempar error ke controller
    }
  }

  async getTravelReviewById(id) {
    try {
      const review = await TravelReviewRepository.getTravelReviewById(id);
      if (!review) {
        throw new Error("Travel review not found"); // Melempar error jika review tidak ditemukan
      }
      return review;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createTravelReview(reviewData) {
    try {
      const requiredFields = ["travel_id", "user_id", "rating", "comment"]; // Daftar field yang wajib ada

      if (!requiredFields.every(field => reviewData[field])) {
        throw new Error("All fields are required"); // Validasi input
      }

      return await TravelReviewRepository.createTravelReview(reviewData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTravelReview(id, reviewData) {
    try {
      const review = await TravelReviewRepository.getTravelReviewById(id);
      if (!review) {
        throw new Error("Travel review not found");
      }
      await TravelReviewRepository.updateTravelReview(id, reviewData);
      return { message: "Travel review updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTravelReview(id) {
    try {
      const review = await TravelReviewRepository.getTravelReviewById(id);
      if (!review) {
        throw new Error("Travel review not found");
      }
      await TravelReviewRepository.deleteTravelReview(id);
      return { message: "Travel review deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new TravelReviewService();
