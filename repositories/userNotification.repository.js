const { UserNotification } = require("../models");

class UserNotificationRepository {
  async findByUserId(userId) {
    return await UserNotification.findOne({
      where: {
        userId: userId,
        isRead: false, // agar hanya satu notifikasi aktif per user
      }
    });
  }

  async createNotification(data) {
    return await UserNotification.create(data);
  }

  async getUnreadNotifications() {
    return await UserNotification.findAll({
      where: { isRead: false }
    });
  }
}

module.exports = new UserNotificationRepository();
