const { Userlevel } = require("../models");

class UserlevelRepository {
  async getAllUserlevels() {
    return await Userlevel.findAll();
  }

  async getUserlevelById(id_level) {
    return await Userlevel.findByPk(id_level);
  }

  async createUserlevel(userlevelData) {
    return await Userlevel.create(userlevelData);
  }

  async updateUserlevel(id_level, userlevelData) {
    return await Userlevel.update(userlevelData, { where: { id_level } });
  }

  async deleteUserlevel(id_level) {
    return await Userlevel.destroy({ where: { id_level } });
  }
}

module.exports = new UserlevelRepository();
