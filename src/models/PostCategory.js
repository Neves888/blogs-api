module.exports = (sequelize, DataTypes) => {
  const PostCategory= sequelize.define(
    'PostCategory',
    {
      postId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
     },
    {
      underscored: true,
      timestamps: false,
      tableName: 'post_category',
    },
  );

  PostCategory.associate = (model) => {
  model.BlogPost.belongsToMany(model.Category, {
    foreignKey: 'postId', 
    as: 'categories',
    otherKey: 'categoryId',
    through: model.PostCategory, 
  });
  model.Category.belongsToMany(model.BlogPost, {
    foreignKey: 'categoryId', 
    as: 'blogPost',
    otherKey: 'postId',
    through: model.PostCategory, 
  });
  };
  return PostCategory;
};