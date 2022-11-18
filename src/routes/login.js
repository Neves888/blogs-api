const express = require('express');

const userController = require('../controllers/controllerUser');

const routes = express.Router();
routes.post('/', userController.loginStart);

module.exports = routes;