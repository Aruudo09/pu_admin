const { Aksesmenu } = require("../models");

class AksesmenuRepository {
  async getAllAksesmenu() {
    return await Aksesmenu.findAll();
  }

  async getAksesmenuById(id) {
    return await Aksesmenu.findByPk(id);
  }

  async createAksesmenu(aksesmenuData) {
    return await Aksesmenu.create(aksesmenuData);
  }

  async updateAksesmenu(id, aksesmenuData) {
    return await Aksesmenu.update(aksesmenuData, { where: { id } });
  }

  async deleteAksesmenu(id) {
    return await Aksesmenu.destroy({ where: { id } });
  }
}

module.exports = new AksesmenuRepository();
