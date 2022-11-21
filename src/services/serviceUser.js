const { User } = require('../models');
const { generationToken } = require('../utils/jwtUtils');

const createUser = async ({ displayName, email, password, image }) => {
  const isUser = await User.findOne({
    where: { email, password },
  });
  if (isUser) return { type: 409, message: 'User already registered' };

  const newUser = await User.create({ displayName, email, password, image });

  const { password: _, ...user } = newUser.dataValues;

  const token = generationToken(user);
  return { type: null, message: { token } };
};

const findUser = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { type: null, message: users };
};

const findUserById = async (id) => {
  const userId = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!userId) return { type: 404, message: 'User does not exist' };
  return { type: null, message: userId };
};
const userEmail = async (email) => {
  const { id } = await User.findOne({
    where: { email },
  });

  return id;
};

const deleteUser = async (id) => {
  const user = await User.destroy({
    where: { id },
  });
  return user;
};

module.exports = {
  createUser,
  findUser,
  findUserById,
  userEmail,
  deleteUser,
};