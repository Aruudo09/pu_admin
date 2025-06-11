const HotelRepository = require('../../repositories/hotels/hotel.repository');

class HotelService {
  async getAllHotels() {
    const hotels = await HotelRepository.getAllHotels();
    return hotels || [];
  }

  async getHotelById(id) {
    try {
      const hotel = await HotelRepository.getHotelById(id);
      return hotel || [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createHotel(hotelData) {
    try {
      const requiredFields = ["name", "location", "rating", "description"];

      if (!requiredFields.every(field => hotelData[field])) {
        throw new Error("Semua field wajib diisi"); // Validasi input
      }

      return await HotelRepository.createHotel(hotelData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateHotel(id, hotelData) {
    try {
      const hotel = await HotelRepository.getHotelById(id);
      if (!hotel) {
        throw new Error("Hotel not found");
      }
      await HotelRepository.updateHotel(id, hotelData);
      return { message: "Hotel updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteHotel(id) {
    try {
      const hotel = await HotelRepository.getHotelById(id);
      if (!hotel) {
        throw new Error("Hotel not found");
      }
      await HotelRepository.deleteHotel(id);
      return { message: "Hotel deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new HotelService();