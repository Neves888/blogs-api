module.exports = (sequelize, DataTypes) => {
  const BlogPost= sequelize.define(
    'BlogPost',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      published: { type: DataTypes.DATE, allowNull: false },
      updated: { type: DataTypes.DATE, allowNull: false },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'BlogPost',
    },
  );

  BlogPost.associate = (model) => {
  BlogPost.belongsTo(model.User, { foreignKey: 'userId', as: 'user' } )
  };
  return BlogPost;
};