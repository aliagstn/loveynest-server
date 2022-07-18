const express = require('express');
const routerTopics = express.Router();
const topicController = require('../controllers/topics');

routerTopics.get('/', topicController.getAllTopics);

routerTopics.post('/', topicController.addTopic)

routerTopics.get('/:id', topicController.getTopicById)

routerTopics.put('/:id', topicController.updateTopic)

routerTopics.delete('/:id', topicController.deleteTopic)

module.exports = routerTopics