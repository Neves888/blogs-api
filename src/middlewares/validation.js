const joi = require('joi');

const validationBody = joi.object({
  displayName: joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
  }),
  password: joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: joi.string().messages({}),
});

const validationFunction = (body) => {
  const { error } = validationBody.validate(body);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: '' };
};

const middlewaresValidation = (req, res, next) => {
const { type, message } = validationFunction(req.body); 
if (type) return res.status(type).json({ message });
next();
};

module.exports = middlewaresValidation;