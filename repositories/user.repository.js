const { Model, Op } = require("sequelize");
const { User } = require("../models");

class UserRepository {
  async getAllUsers() {
    return await User.findAll();
  }

  async getPaginatedUsers({ start, length, search, order, columns }) {
    const where = search
      ? {
          [Op.or]: [
            { username: { [Op.like]: `%${search}%` } },
            { fullname: { [Op.like]: `%${search}%` } },
            { id_level: { [Op.like]: `%${search}%` } },
            { createdAt: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const sort =
      order && order.length > 0
        ? [[columns[order[0].column].data, order[0].dir]]
        : [["created_at", "DESC"]];

    const offset = start || 0; // Default to 0 if start is not provided
    const limit = length || 10; // Default to 10 if length is not provided

    const result = await User.findAndCountAll({
      where,
      order: sort,
      offset,
      limit,
    });

    return result;
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(id, userData) {
    return await User.update(userData, { where: { id } });
  }

  async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();
