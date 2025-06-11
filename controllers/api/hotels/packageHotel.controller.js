const response = require("../../../utils/response");
const packageHotelService = require("../../../services/hotels/packageHotel.service");

class PackageHotelController {
  async getAllPackageHotels(req, res) {
    try {
      const packageHotels = await packageHotelService.getAllPackageHotels();
      return response.success(res, "All package hotels fetched", packageHotels);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async getPackageHotelById(req, res) {
    try {
      const packageHotel = await packageHotelService.getPackageHotelById(req.params.id);
      return response.success(res, "Package hotel fetched", packageHotel);
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }

  async createPackageHotel(req, res) {
    try {
      const packageHotel = await packageHotelService.createPackageHotel(req.body);
      return response.success(res, "Package hotel created successfully", packageHotel);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async updatePackageHotel(req, res) {
    try {
      const updatedPackageHotel = await packageHotelService.updatePackageHotel(req.params.id, req.body);
      return response.success(res, "Package hotel updated successfully", updatedPackageHotel);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async deletePackageHotel(req, res) {
    try {
      const result = await packageHotelService.deletePackageHotel(req.params.id);
      return response.success(res, "Package hotel deleted successfully", result);
    } catch (error) {
      return response.error(res, error.message);
    }
  }
}

module.exports = new PackageHotelController();