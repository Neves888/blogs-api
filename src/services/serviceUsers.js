const Joi = require('joi');
const { User } = require('../models');

const validationLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
  }),
});

const isLogin = async ({ email, password }) => {
  const response = await User.findOne({
    where: { email, password },
  });

  if (!response) return { type: 400, message: 'Invalid fields' };

  return { type: null, message: response };
};

module.exports = {
  isLogin,
  validationLogin,
};