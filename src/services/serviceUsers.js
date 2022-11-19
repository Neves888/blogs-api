const { User } = require('../models');

const isLogin = async ({ email, password }) => {
  const response = await User.findOne({
    where: { email, password },
  });

  if (!response) return { type: 400, message: 'Invalid fields' };

  return { type: null, message: response };
};

module.exports = { isLogin };