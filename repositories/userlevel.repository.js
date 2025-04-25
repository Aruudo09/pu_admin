const { Model, Op } = require("sequelize");
const { Userlevel } = require("../models");

class UserlevelRepository {
  async getAllUserlevels() {
    return await Userlevel.findAll();
  }

  async getPaginatedUserlevels({ start, length, search, order, columns, id_level }) {
    const where = {
      ...(search && {
        [Op.or]: [
          { id_level: { [Op.like]: `%${search}%` } },
          { nama_level: { [Op.like]: `%${search}%` } }
        ]
      }),
      // ...(id_level && { id_level }) // Menambahkan filter berdasarkan id_level user yang login
    };
  
    const sort =
      order && order.length > 0
        ? [[columns[order[0].column].data, order[0].dir]]
        : [["created_at", "DESC"]];
  
    const offset = start || 0; // Default to 0 if start is not provided
    const limit = length || 10; // Default to 10 if length is not provided
  
    // Query dengan filter id_level dan kondisi lainnya
    const result = await Userlevel.findAndCountAll({
      where,
      order: sort,
      offset,
      limit
    });
  
    return result;
  }
  

  async getUserlevelById(id_level) {
    return await Userlevel.findByPk(id_level);
  }

  async createUserlevel(userlevelData) {
    return await Userlevel.create(userlevelData);
  }

  async updateUserlevel(id_level, userlevelData) {
    return await Userlevel.update(userlevelData, { where: { id_level } });
  }

  async deleteUserlevel(id_level) {
    return await Userlevel.destroy({ where: { id_level } });
  }
}

module.exports = new UserlevelRepository();
