const MenuRepository = require("../repositories/menu.repository");

class MenuService {
  async getAllMenu() {
    const menu = await MenuRepository.getAllMenu();
    if (menu.length === 0) {
      throw new Error("No menu found");
    }
    return menu;
  }

  async getAllMenuDatatables({ draw, start, length, search, order, columns }) {
    const searchValue = search?.value || "";

    const { count, rows } = await MenuRepository.getPaginatedMenu({
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