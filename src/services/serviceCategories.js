const { Category } = require('../models');

const createCategories = async ({ name }) => {
 if (!name) return { type: 400, message: '"name" is required' };

 const category = await Category.create({ name });
 return { type: null, message: category }; 
};

module.exports = {
  createCategories,
};
