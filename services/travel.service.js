const TravelRepository = require("../repositories/travel.repository");

class TravelService {
  async getAllTravels() {
    try {
      const travels = await TravelRepository.getAllTravels();
      if (travels.length === 0) {
        throw new Error("No travels found"); // Menangani kasus data kosong
      }
      return travels;
    } catch (error) {
      throw new Error(error.message); // Melempar error ke controller
    }
  }

  async getTravelById(id) {
    try {
      const travel = await TravelRepository.getTravelById(id);
      if (!travel) {
        throw new Error("Travel not found"); // Melempar error jika travel tidak ditemukan
      }
      return travel;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createTravel(travelData) {
    try {
      const requiredFields = ["name", "description", "logo_url", "contact_person", "phone", "email", "address", "website", "is_verified"];

      if (!requiredFields.every(field => travelData[field])) {
        throw new Error("Semua field wajib diisi"); // Validasi input
      }

      return await TravelRepository.createTravel(travelData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTravel(id, travelData) {
    try {
      const travel = await TravelRepository.getTravelById(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      await TravelRepository.updateTravel(id, travelData);
      return { message: "Travel updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTravel(id) {
    try {
      const travel = await TravelRepository.getTravelById(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      await TravelRepository.deleteTravel(id);
      return { message: "Travel deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

    async getAllTravelsDatatables({ draw, start, length, search, order, columns }) {
        const searchValue = search?.value || "";

        const { count, rows } = await TravelRepository.getPaginatedTravel({
            start: parseInt(start, 10) || 0,
            length: parseInt(length, 10) || 10,
            search: searchValue,
            order,
            columns
        });

        return {
            draw: parseInt(draw, 10),
            recordsTotal: count,
            recordsFiltered: count,
            data: rows
        };
    }  
}

module.exports = new TravelService();
