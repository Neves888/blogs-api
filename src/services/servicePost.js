const { BlogPost, User, Category } = require('../models');
const userService = require('./serviceUser');

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

const userGetPostId = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
  });
  if (!post) return undefined;
  return post.userId;
};

const deletePost = async (emailUser, postId) => {
  const idUser = await userService.userEmail(emailUser);
  const postUserId = await userGetPostId(postId);
  const post = await getPostByUser(postId);
  if (post.type) return { type: post.type, message: post.message };

  const grantAccess = idUser === postUserId;
  if (!grantAccess) return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };

  await getPost.destroy({ where: { postId } });
  await BlogPost.destroy({ where: { id: postId } });
  return { type: null, message: '' };
};

module.exports = {
  getPost,
  getPostByUser,
  putPost,
  deletePost,
};