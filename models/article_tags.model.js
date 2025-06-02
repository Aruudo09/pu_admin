Article.associate = (models) => {
  Article.belongsTo(models.ArticleCategory, {
    foreignKey: 'category_id',
    as: 'category'
  });

  Article.belongsTo(models.User, {
    foreignKey: 'author_id',
    as: 'author'
  });

  Article.belongsToMany(models.Tag, {
    through: 'article_tags',
    foreignKey: 'article_id',
    otherKey: 'tag_id',
    as: 'tags'
  });
};
