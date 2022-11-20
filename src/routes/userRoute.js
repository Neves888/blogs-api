const express = require('express');

const userController = require('../controllers/controllerUser');
const tokenValidation = require('../middlewares/token');
const validation = require('../middlewares/validation');

const routes = express.Router();
routes.post('/', validation, userController.insert);
routes.get('/', tokenValidation, userController.findUser);

module.exports = routes;