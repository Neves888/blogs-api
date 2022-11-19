const express = require('express');

const userController = require('../controllers/controllerUser');
const validation = require('../middlewares/validation');

const routes = express.Router();
routes.post('/', validation, userController.insert);

module.exports = routes;