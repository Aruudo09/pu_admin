module.exports = (sequelize, DataTypes) => {
  const PackageHotel = sequelize.define('PackageHotel', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_type: {
      type: DataTypes.ENUM('Mekkah', 'Madinah'),
      allowNull: false,
    },
    number_of_night: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'package_hotels',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  PackageHotel.associate = models => {
    PackageHotel.belongsTo(models.Hotel, { foreignKey: 'hotel_id' });
  };

  return PackageHotel;
};
