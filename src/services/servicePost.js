const { BlogPost, User, Category } = require('../models');

const getPost = async () => {
  const pots = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: pots };
};

const getPostByUser = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (post) return { type: null, message: post };
  return { type: 404, message: 'Post does not exist' };
};

const putPost = async (idParams, body, user) => {
  const { title, content } = body;
  const { dataValues: { id } } = user;
  const { dataValues } = await BlogPost.findOne({ where: { id: idParams } });
  if (dataValues.userId !== id) return { type: 401, message: 'Unauthorized user' };
  await BlogPost.update({ title, content, updated: new Date() },
    { where: { id: idParams } });
  const newPost = await BlogPost.findByPk(idParams, {
    include: [
      { model: User, as: 'user', where: { id }, attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: newPost };
};

const deletePost = async (idParams, userId) => {
  const postGetUser = await BlogPost.findByPk(idParams, { 
    where: userId });
  if (!postGetUser) return { type: 404, message: 'Post does not exist' };
  // console.log(typeof postGetUser.dataValues.userId);
  // console.log(typeof userId);
  // console.log(postGetUser.dataValues.userId === 2);
  if (postGetUser.dataValues.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
  await BlogPost.destroy({ where: { id: idParams } });
  return { type: null, message: '' };
};

module.exports = {
  getPost,
  getPostByUser,
  putPost,
  deletePost,
};