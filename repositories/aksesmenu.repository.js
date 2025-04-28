const { where } = require("sequelize");
const { Aksesmenu, Menu } = require("../models");

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

  async getAksesmenuByLevel(id_level) {
    return await Menu.findAll({
      include: [{ 
        model: Aksesmenu, 
        required: true,
        where: { id_level: id_level },
      }],
    });
  }
}

module.exports = new AksesmenuRepository();
