const express = require('express');

const userController = require('../controllers/controllerLogin');
const loginMiddlewares = require('../middlewares/login');

const routes = express.Router();
routes.post('/', loginMiddlewares, userController.loginStart);

module.exports = routes;