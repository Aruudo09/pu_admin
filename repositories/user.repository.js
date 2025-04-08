const { User } = require("../models");

class UserRepository {
  async getAllUsers() {
    return await User.findAll();
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
