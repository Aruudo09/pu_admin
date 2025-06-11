const { Model, Op } = require("sequelize"); // Import Op for Sequelize operators
const { PackageHotel } = require("../../models");

class PackageHotelRepository {
  async getAllPackageHotels() {
    return await PackageHotel.findAll();
  }

  async getPaginatedPackageHotels({ start, length, search, order, columns }) {
    const where = {
      ...(search && {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { price: { [Op.like]: `%${search}%` } },
          { created_at: { [Op.like]: `%${search}%` } }
        ]
      }),
    };

    const sort =
      order && order.length > 0
        ? [[columns[order[0].column].data, order[0].dir]]
        : [["created_at", "DESC"]];

    const offset = start || 0; // Default to 0 if start is not provided
    const limit = length || 10; // Default to 10 if length is not provided

    const result = await PackageHotel.findAndCountAll({
      where,
      order: sort,
      offset,
      limit
    });

    return result;
  }

  async getPackageHotelById(id) {
    return await PackageHotel.findByPk(id);
  }

  async createPackageHotel(packageHotelData) {
    return await PackageHotel.create(packageHotelData);
  }

  async updatePackageHotel(id, packageHotelData) {
    return await PackageHotel.update(packageHotelData, { where: { id } });
  }

  async deletePackageHotel(id) {
    return await PackageHotel.destroy({ where: { id } });
  }
}

module.exports = new PackageHotelRepository();