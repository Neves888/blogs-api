const express = require('express');

const postController = require('../controllers/controllerPost');
const tokenValidation = require('../middlewares/token');
const editValidation = require('../middlewares/edit');

const routes = express.Router();
routes.get('/', tokenValidation, postController.getPost);
routes.get('/:id', tokenValidation, postController.getPostByUser);
routes.put('/:id', tokenValidation, editValidation, postController.putPost);
routes.delete('/:id', tokenValidation, postController.deletePost);

module.exports = routes;