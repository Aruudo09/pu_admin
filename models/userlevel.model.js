module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Userlevel", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: true,
      }
    },
    {
      tableName: "tbl_user", // 👈 Tambahkan ini agar Sequelize pakai nama tabel yang benar
      timestamps: false // Hapus jika pakai createdAt & updatedAt
    });
  
    return User;
  };
  