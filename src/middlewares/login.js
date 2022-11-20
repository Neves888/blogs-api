const joi = require('joi');

const validationLogin = joi.object({
  email: joi.string().email().required().messages({
    'string.empty': 'Some required fields are missing',
  }),
  password: joi.string().required().messages({
    'string.empty': 'Some required fields are missing',
  }),
});

const loginValidation = (body) => {
  const { error } = validationLogin.validate(body);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: '' };
};

const loginMiddlewares = (req, res, next) => {
const { type, message } = loginValidation(req.body); 
if (type) return res.status(type).json({ message });
next();
};

module.exports = loginMiddlewares;
