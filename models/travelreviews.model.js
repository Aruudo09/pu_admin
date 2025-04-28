module.exports = (sequelize, DataTypes) => {
    const TravelReview = sequelize.define("TravelReview", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      travel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      tableName: "travel_reviews", // 👈 Nama tabel diubah menjadi travel_reviews
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    });
  
    return TravelReview;
};
