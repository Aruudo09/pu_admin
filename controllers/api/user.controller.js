const response = require("../../utils/response");
const userService = require("../../services/user.service");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return response.success(res, "All user fetched", users)
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      return response.success(res, "User fetched", user);
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      return response.success(res, "User created", newUser);
    } catch (error) {
      return response.success(res, error.message, 400);
    }
  }

  async updateUser(req, res) {
    try {
      await userService.updateUser(req.params.id, req.body);
      return response.success(res, "User updated successfully");
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      return response.success(res, "User deleted successfully");
    } catch (error) {
      res.status(404).json({ message: error.message });
      return response.notFound(res, error.message);
    }
  }
}

module.exports = new UserController();
