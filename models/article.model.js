module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail_url: {
      type: DataTypes.STRING(255),
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    author_id: {
      type: DataTypes.INTEGER,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    published_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: "articles",
    timestamps: true, // Kalau kamu ingin pakai createdAt dan updatedAt
    underscored: true // Biar jadi created_at & updated_at
  });

  Article.associate = (models) => {
    Article.belongsTo(models.ArticleCategory, { foreignKey: 'category_id' });
    Article.belongsTo(models.User, { foreignKey: 'author_id' });
    Article.belongsToMany(models.Tag, {
      through: 'article_tags',
      foreignKey: 'article_id',
      otherKey: 'tag_id',
    });
  };

  return Article;
};
