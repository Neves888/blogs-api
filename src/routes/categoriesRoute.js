const express = require('express');

const categoriesController = require('../controllers/controllerCategories');
const tokenValidation = require('../middlewares/token');

const routes = express.Router();
routes.post('/', tokenValidation, categoriesController.createCategories);
routes.get('/', tokenValidation, categoriesController.findCategories);

module.exports = routes;