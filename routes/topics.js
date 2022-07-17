const express = require('express');
const routerTopics = express.Router();
const topicController = require('../controllers/users');

routerTopics.post('/', topicController.addTopic);

routerTopics.get('/', topicController.getAllTopics);

module.exports = routerTopics