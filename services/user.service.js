const userRepository = require("../repositories/user.repository");
const { hashPassword } = require("../utils/hash");

class UserService {
  async getAllUsers() {
    try {
      const users = await userRepository.getAllUsers();
      if (users.length === 0) {
        throw new Error("No users found"); // Menangani kasus data kosong
      }
      return users;
    } catch (error) {
      throw new Error(error.message); // Melempar error ke controller
    }
  }

  async getUserById(id) {
    try {
      const user = await userRepository.getUserById(id);
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

      return await userRepository.createUser(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await userRepository.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      await userRepository.updateUser(id, userData);
      return { message: "User updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await userRepository.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      await userRepository.deleteUser(id);
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserService();
