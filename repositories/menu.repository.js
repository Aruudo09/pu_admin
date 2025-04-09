const { Menu } = require("../models");

class MenuRepository {
  async getAllMenu() {
    return await Menu.findAll();
  }

  async getMenuById(id_menu) {
    return await Menu.findByPk(id_menu);
  }

  async createMenu(menuData) {
    return await Menu.create(menuData);
  }

  async updateMenu(id_menu, menuData) {
    return await Menu.update(menuData, { where: { id_menu } });
  }

  async deleteMenu(id_menu) {
    return await Menu.destroy({ where: { id_menu } });
  }
}

module.exports = new MenuRepository();
