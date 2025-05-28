module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: "tags",
    timestamps: true,
    underscored: true,
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Article, {
      through: 'article_tags',
      foreignKey: 'tag_id',
      otherKey: 'article_id',
      as: 'articles',
    });
  };

  return Tag;
};
