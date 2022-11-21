const postService = require('../services/servicePost');

const getPost = async (_req, res) => {
  const { type, message } = await postService.getPost();
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const getPostByUser = async (req, res) => {
  const { id } = req.params;
  // const { type, message } = await postService.getPostByUser(req.user, req.params.id);
  const { type, message } = await postService.getPostByUser(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const putPost = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const newPost = req.body;
  const { type, message } = await postService.putPost(id, newPost, user);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const deletePost = async (req, res) => {  
  const { type, message } = await postService.deletePost(req.params.id, req.user.dataValues.id);
  console.log(req.params.id, req.user.dataValues.id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json(message);
};

module.exports = {
  getPost,
  getPostByUser,
  putPost,
  deletePost,
};