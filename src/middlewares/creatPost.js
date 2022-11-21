const joi = require('joi');

const validationBody = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required(),
}).messages({ 'string.empty': 'Some required fields are missing', 
'array.empty': 'Some required fields are missing' });

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