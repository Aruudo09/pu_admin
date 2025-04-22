const { Travel } = require("../models");

class TravelRepository {
  async getAllTravels() {
    return await Travel.findAll();
  }

  async getTravelById(id) {
    return await Travel.findByPk(id);
  }

  async createTravel(travelData) {
    return await Travel.create(travelData);
  }

  async updateTravel(id, userData) {
    return await Travel.update(userData, { where: { id } });
  }

  async deleteTravel(id) {
    return await Travel.destroy({ where: { id } });
  }
}

module.exports = new TravelRepository();
