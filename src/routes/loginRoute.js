const express = require('express');

const userController = require('../controllers/controllerLogin');

const routes = express.Router();
routes.post('/', userController.loginStart);

module.exports = routes;