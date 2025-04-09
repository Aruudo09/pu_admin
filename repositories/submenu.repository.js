const { Submenu } = require("../models");

class SubmenuRepository {
  async getAllSubmenu() {
    return await Submenu.findAll();
  }

  async getSubmenuById(id_submenu) {
    return await Submenu.findByPk(id_submenu);
  }

  async createSubmenu(menuData) {
    return await Submenu.create(menuData);
  }

  async updateSubmenu(id_submenu, menuData) {
    return await Submenu.update(menuData, { where: { id_submenu } });
  }

  async deleteSubmenu(id_submenu) {
    return await Submenu.destroy({ where: { id_submenu } });
  }
}

module.exports = new SubmenuRepository();
