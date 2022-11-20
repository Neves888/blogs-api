const { User } = require('../models');
const { generationToken } = require('../utils/jwtUtils');

const isLogin = async ({ email, password }) => {
  const response = await User.findOne({
    where: { email, password },
  });
  if (!response) return { type: 400, message: 'Invalid fields' };

  const { password: _, ...user } = response;
    
  const token = generationToken(user);
  return { type: null, message: { token } };  
};

module.exports = { 
  isLogin,
 };