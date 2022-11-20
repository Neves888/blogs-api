const { BlogPost, User, Category } = require('../models');

const getPost = async () => {
const pots = BlogPost.findAll({
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] }, 
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] }, 
    },
  ],
});
return { type: null, message: pots };
};

module.exports = {
  getPost,
};