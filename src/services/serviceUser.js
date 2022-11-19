const { User } = require('../models');
const { generationToken } = require('../utils/jwtUtils');
  
  const createUser = async ({ displayName, email, password, image }) => {
    const isUser = await User.findOne({
      where: { email, password },
    });
    if (isUser) return { type: 409, message: 'User already registered' };

    const newUser = await User.create({ displayName, email, password, image });

    const { password: _, ...user } = newUser;

    const token = generationToken(user);
    return { type: null, message: { token } };  
  };

  module.exports = { 
    createUser,
   };