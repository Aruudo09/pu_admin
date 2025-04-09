module.exports = (sequelize, DataTypes) => {
    const Userlevel = sequelize.define("Userlevel", {
      id_level: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nama_level: {
        type: DataTypes.STRING(20),
        allowNull: false,
      }
    },
    {
      tableName: "tbl_userlevel", // 👈 Tambahkan ini agar Sequelize pakai nama tabel yang benar
      timestamps: false // Hapus jika pakai createdAt & updatedAt
    });
  
    return Userlevel;
  };
  