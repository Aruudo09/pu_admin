module.exports = (sequelize, DataTypes) => {
  const ArticleCategory = sequelize.define("ArticleCategory", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(100),
    slug: DataTypes.STRING(100),
  }, {
    tableName: "article_categories",
    timestamps: true,
    underscored: true,
  });

  ArticleCategory.associate = (models) => {
    ArticleCategory.hasMany(models.Article, { foreignKey: 'category_id' });
  };

  return ArticleCategory;
};
