const express = require('express');
const routerTopicCategories = express.Router();
const topicController = require('../controllers/topics');

routerTopicCategories.get('/', topicController.getAllCategory)

routerTopicCategories.post('/', topicController.addCategory)

routerTopicCategories.get('/:id', topicController.getCategoryById)

routerTopicCategories.put('/:id', topicController.updateCategory)

routerTopicCategories.delete('/:id', topicController.deleteCategory)

module.exports = routerTopicCategories;