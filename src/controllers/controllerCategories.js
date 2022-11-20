const categoriesService = require('../services/serviceCategories');

const createCategories = async (req, res) => {
    const { type, message } = await categoriesService.createCategories(req.body);
    if (type) return res.status(type).json({ message });
    res.status(201).json(message);
};

const findCategories = async (_req, res) => {
  const { type, message } = await categoriesService.findCategories();
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

module.exports = { 
  createCategories,
  findCategories,
};