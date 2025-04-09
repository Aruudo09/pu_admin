const UserlevelRepository = require("../repositories/userlevel.repository");

class UserlevelService {
  async getAllUserlevel() {
    const userlevel = await UserlevelRepository.getAllUserlevel();
    if (userlevel.length === 0) {
      throw new Error("No userlevel found");
    }
    return userlevel;
  }

  async getUserlevelById(id_level) {
    const userlevel = await UserlevelRepository.getUserlevelById(id_level);
    if (!userlevel) {
      throw new Error("Userlevel not found");
    }
    return userlevel;
  }

  async createUserlevel(userlevelData) {
    const requiredFields = ["id_level", "nama_level"];
    if (!requiredFields.every(field => userlevelData[field])) {
      throw new Error("Semua field wajib diisi");
    }
    return await UserlevelRepository.createUserlevel(userlevelData);
  }

  async updateUserlevel(id_level, userlevelData) {
    const userlevel = await UserlevelRepository.getUserlevelById(id_level);
    if (!userlevel) {
      throw new Error("Userlevel not found");
    }
    return await UserlevelRepository.updateUserlevel(id_level, userlevelData);
  }

  async deleteUserlevel(id_level) {
    const userlevel = await UserlevelRepository.getUserlevelById(id_level);
    if (!userlevel) {
      throw new Error("Userlevel not found");
    }
    return await UserlevelRepository.deleteUserlevel(id_level);
  }
}

module.exports = new UserlevelService();