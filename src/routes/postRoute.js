const express = require('express');

const postController = require('../controllers/controllerPost');
const tokenValidation = require('../middlewares/token');

const routes = express.Router();
routes.get('/', tokenValidation, postController.getPost);

module.exports = routes;