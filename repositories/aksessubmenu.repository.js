const { Aksessubmenu } = require("../models");

class AksessubmenuRepository {
  async getAllAksessubmenu() {
    return await Aksessubmenu.findAll();
  }

  async getAksessubmenuById(id) {
    return await Aksessubmenu.findByPk(id);
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
