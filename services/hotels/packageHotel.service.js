const PackageHotelRepository = require("../../repositories/hotels/packageHotel.repository");

class PackageHotelService {
  async getAllPackageHotels() {
    const packageHotels = await PackageHotelRepository.getAllPackageHotels();
    return packageHotels || [];
  }

  async getPackageHotelById(id) {
    try {
      const packageHotel = await PackageHotelRepository.getPackageHotelById(id);
      return packageHotel || [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPackageHotel(packageHotelData) {
    try {
      const requiredFields = ["package_id", "hotel_id", "location_type", "number_of_night"];

      if (!requiredFields.every(field => packageHotelData[field])) {
        throw new Error("Semua field wajib diisi"); // Validasi input
      }

      return await PackageHotelRepository.createPackageHotel(packageHotelData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePackageHotel(id, packageHotelData) {
    try {
      const packageHotel = await PackageHotelRepository.getPackageHotelById(id);
      if (!packageHotel) {
        throw new Error("Package Hotel not found");
      }
      await PackageHotelRepository.updatePackageHotel(id, packageHotelData);
      return { message: "Package Hotel updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deletePackageHotel(id) {
    try {
      const packageHotel = await PackageHotelRepository.getPackageHotelById(id);
      if (!packageHotel) {
        throw new Error("Package Hotel not found");
      }
      await PackageHotelRepository.deletePackageHotel(id);
      return { message: "Package Hotel deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new PackageHotelService();