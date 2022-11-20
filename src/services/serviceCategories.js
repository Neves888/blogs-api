const { Category } = require('../models');

const createCategories = async ({ name }) => {
 if (!name) return { type: 400, message: '"name" is required' };

 const category = await Category.create({ name });
 return { type: null, message: category }; 
};

const findCategories = async (id, name) => {
  const categories = await Category.findAll({ id, name });
  return { type: null, message: categories };
};

module.exports = {
  createCategories,
  findCategories,
};
