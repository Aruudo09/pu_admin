const SubmenuRepository = require("../repositories/submenu.repository");

class SubmenuService {
  async getAllSubmenu() {
    const submenu = await SubmenuRepository.getAllSubmenu();
    if (submenu.length === 0) {
      throw new Error("No submenu found");
    }
    return submenu;
  }

  async getSubmenuById(id_submenu) {
    const submenu = await SubmenuRepository.getSubmenuById(id_submenu);
    if (!submenu) {
      throw new Error("Submenu not found");
    }
    return submenu;
  }

  async createSubmenu(subMenuData) {
    const requiredFields = ["id_menu", "nama_submenu", "link", "icon", "urutan", "is_active"];
    if (!requiredFields.every(field => subMenuData[field])) {
      throw new Error("Semua field wajib diisi");
    }
    return await SubmenuRepository.createSubmenu(subMenuData);
  }

  async updateSubmenu(id_submenu, subMenuData) {
    const submenu = await SubmenuRepository.getSubmenuById(id_submenu);
    if (!submenu) {
      throw new Error("Submenu not found");
    }
    return await SubmenuRepository.updateSubmenu(id_submenu, subMenuData);
  }

  async deleteSubmenu(id_submenu) {
    const submenu = await SubmenuRepository.getSubmenuById(id_submenu);
    if (!submenu) {
      throw new Error("Submenu not found");
    }
    return await SubmenuRepository.deleteSubmenu(id_submenu);
  }
}

module.exports = new SubmenuService();