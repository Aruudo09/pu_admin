const MenuRepository = require("../repositories/menu.repository");

class MenuService {
  async getAllMenu() {
    const menu = await MenuRepository.getAllMenu();
    if (menu.length === 0) {
      throw new Error("No menu found");
    }
    return menu;
  }

  async getMenuById(id_menu) {
    const menu = await MenuRepository.getMenuById(id_menu);
    if (!menu) {
      throw new Error("Menu not found");
    }
    return menu;
  }

  async createMenu(menuData) {
    const requiredFields = ["nama_menu", "link", "icon", "urutan", "is_active"];
    if (!requiredFields.every(field => menuData[field])) {
      throw new Error("Semua field wajib diisi");
    }
    return await MenuRepository.createMenu(menuData);
  }

  async updateMenu(id_menu, menuData) {
    const menu = await MenuRepository.getMenuById(id_menu);
    if (!menu) {
      throw new Error("Menu not found");
    }
    return await MenuRepository.updateMenu(id_menu, menuData);
  }

  async deleteMenu(id_menu) {
    const menu = await MenuRepository.getMenuById(id_menu);
    if (!menu) {
      throw new Error("Menu not found");
    }
    return await MenuRepository.deleteMenu(id_menu);
  }
}

module.exports = new MenuService();