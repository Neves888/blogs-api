const { BlogPost, User, Category } = require('../models');

const getPost = async () => {
const pots = await BlogPost.findAll({
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

const getPostByUser = async (id) => {
  const post = await await BlogPost.findByPk(id);
  if (!post) return { type: 404, message: 'Post does not exist' };
  const pots = await BlogPost.findByPk(id, {
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
  getPostByUser,
};