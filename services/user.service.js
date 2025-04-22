const UserRepository = require("../repositories/user.repository");
const { hashPassword } = require("../utils/hash");

class UserService {
  async getAllUsers() {
    try {
      const users = await UserRepository.getAllUsers();
      if (users.length === 0) {
        throw new Error("No users found"); // Menangani kasus data kosong
      }
      return users;
    } catch (error) {
      throw new Error(error.message); // Melempar error ke controller
    }
  }

  async getAllUsersDatatables({ draw, start, length, search, order, columns }) {
    try {
      const offset = parseInt(start, 10) || 0;
      const limit = parseInt(length, 10) || 10;
      const searchValue = search?.value || '';

      let orderClause = [['created_at', 'DESC']];
      if (order && order.length > 0) {
        const columnIdx = parseInt(order[0].column, 10);
        const columnName = columns[columnIdx]?.data;
        const dir = order[0].dir || 'asc';
        if (columnName) {
          orderClause = [[columnName, dir]];
        }
      }

      const { count, rows } = await UserRepository.getPaginatedUsers({
        start: offset,
        length: limit,
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
    } catch (error) {
      throw new Error(error.message); // Melempar error ke controller
    }
  }

  async getUserById(id) {
    try {
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new Error("User not found"); // Melempar error jika user tidak ditemukan
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(userData) {
    try {
      const requiredFields = ["username", "fullname", "password", "id_level", "is_active", "app"];

      if (!requiredFields.every(field => userData[field])) {
        throw new Error("Semua field wajib diisi"); // Validasi input
      }
      // 🔒 Hash password sebelum disimpan
      userData.password = await hashPassword(userData.password);

      return await UserRepository.createUser(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      userData.password = await hashPassword(userData.password);
      await UserRepository.updateUser(id, userData);
      return { message: "User updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      await UserRepository.deleteUser(id);
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserService();
