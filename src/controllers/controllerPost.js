const postService = require('../services/servicePost');

const getPost = async (_req, res) => {
  const { type, message } = await postService.getPost();
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

module.exports = {
  getPost,
};