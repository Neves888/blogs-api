const jwt = require('jsonwebtoken');
require('dotenv/config');

const generationToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

const validationToken = (token) => {
 if (!token) return { type: 401, message: 'Token not found' };
 try {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  return { type: null, message: user };
 } catch (error) {
  return { type: 401, message: 'Expired or invalid token' };
 }
};

module.exports = {
  generationToken,
  validationToken,
};