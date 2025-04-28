const response = require("../../utils/response");
const travelService = require("../../services/travel.service");

class TravelController {
  async getAllTravels(req, res) {
    try {
      const users = await travelService.getAllTravels();
      return response.success(res, "All user fetched", users)
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async getTravelById(req, res) {
    try {
      const user = await travelService.getTravelById(req.params.id);
      return response.success(res, "User fetched", user);
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }

  async createTravel(req, res) {
    try {
      const newTravel = await travelService.createTravel(req.body);
      return response.success(res, "Travel created", newTravel);
    } catch (error) {
      return response.success(res, error.message, 400);
    }
  }

  async updateTravel(req, res) {
    try {
      await travelService.updateTravel(req.params.id, req.body);
      return response.success(res, "Travel updated successfully");
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async deleteTravel(req, res) {
    try {
      await travelService.deleteTravel(req.params.id);
      return response.success(res, "Travel deleted successfully");
    } catch (error) {
      res.status(404).json({ message: error.message });
      return response.notFound(res, error.message);
    }
  }
}

module.exports = new TravelController();
