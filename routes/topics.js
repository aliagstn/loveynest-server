const express = require('express');
const routerTopics = express.Router();
const topicController = require('../controllers/topics');

routerTopics.get('/', topicController.getAllTopics);

routerTopics.get('/coupleTopics', topicController.allCoupleTopics);

routerTopics.get('/categories', topicController.getAllCategory)

routerTopics.post('/', topicController.addTopic)

routerTopics.post('/coupleTopics', topicController.addCoupleTopics);

routerTopics.post('/categories', topicController.addCategory)

routerTopics.get('/:id', topicController.getTopicById)

routerTopics.get('/coupleTopics/:id', topicController.getCoupleTopicById)

routerTopics.get('/categories/:id', topicController.getCategoryById)

routerTopics.put('/:id', topicController.updateTopic)

routerTopics.put('/coupleTopics/:id', topicController.updateCoupleTopic)

routerTopics.put('/categories/:id', topicController.updateCategory)

routerTopics.delete('/:id', topicController.deleteTopic)

routerTopics.delete('/coupleTopics/:id', topicController.deleteCoupleTopic)

routerTopics.delete('/categories/:id', topicController.deleteCategory)

module.exports = routerTopics