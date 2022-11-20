module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'users',
    },
  );
  User.associate = (model) => {
  User.hasMany(model.BlogPost, { foreignKey: 'userId', as: 'blogPost' })
  };
  return User;
};