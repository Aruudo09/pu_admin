const { Aksessubmenu, Submenu } = require("../models");

class AksessubmenuRepository {
  async getAllAksessubmenu() {
    return await Aksessubmenu.findAll();
  }

  async getAksessubmenuById(id) {
    return await Aksessubmenu.findByPk(id);
  }

  async getAksessubmenuWithSubmenuByLevel(id_level) {
    return await Submenu.findAll({
      include: [{
        model: Aksessubmenu,
        required: false,
        where: { id_level: id_level },
      }],
    });
  }

  async createAksessubmenu(aksesmenuData) {
    return await Aksessubmenu.create(aksesmenuData);
  }

  async updateAksessubmenu(id, aksesmenuData) {
    return await Aksessubmenu.update(aksesmenuData, { where: { id } });
  }

  async deleteAksessubmenu(id) {
    return await Aksessubmenu.destroy({ where: { id } });
  }
}

module.exports = new AksessubmenuRepository();
