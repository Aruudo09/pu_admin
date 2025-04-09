const submenuService = require("../../services/submenu.service");
const response = require("../../utils/response");

class SubmenuController {
  async getAllSubmenu(req, res) {
    try {
      const submenu = await submenuService.getAllSubmenu();
      return response.success(res, "All submenu fetched", submenu);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async getSubmenuById(req, res) {
    try {
      const submenu = await submenuService.getSubmenuById(req.params.id);
      return response.success(res, "Submenu fetched", submenu);
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }

  async createSubmenu(req, res) {
    try {
      const submenu = await submenuService.createSubmenu(req.body);
      return response.created(res, "Submenu created", submenu);
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async updateSubmenu(req, res) {
    try {
      await submenuService.updateSubmenu(req.params.id, req.body);
      return response.success(res, "Submenu updated successfully");
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async deleteSubmenu(req, res) {
    try {
      await submenuService.deleteSubmenu(req.params.id);
      return response.success(res, "Submenu deleted successfully");
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }
}

module.exports = new SubmenuController();