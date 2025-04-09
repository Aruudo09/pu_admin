const userlevelService = require("../services/userlevel.service");
const response = require("../utils/response");

class UserlevelController {
  async getAllUserlevel(req, res) {
    try {
      const userlevel = await userlevelService.getAllUserlevel();
      return response.success(res, "All userlevel fetched", userlevel);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async getUserlevelById(req, res) {
    try {
      const userlevel = await userlevelService.getUserlevelById(req.params.id);
      return response.success(res, "Userlevel fetched", userlevel);
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }

  async createUserlevel(req, res) {
    try {
      const userlevel = await userlevelService.createUserlevel(req.body);
      return response.created(res, "Userlevel created", userlevel);
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async updateUserlevel(req, res) {
    try {
      await userlevelService.updateUserlevel(req.params.id, req.body);
      return response.success(res, "Userlevel updated successfully");
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async deleteUserlevel(req, res) {
    try {
      await userlevelService.deleteUserlevel(req.params.id);
      return response.success(res, "Userlevel deleted successfully");
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }
}

module.exports = new UserlevelController();