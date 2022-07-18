const express = require('express');
const routerCoupleTopics = express.Router();
const topicController = require('../controllers/topics');

routerCoupleTopics.get('/', topicController.allCoupleTopics);

routerCoupleTopics.post('/', topicController.addCoupleTopics);

routerCoupleTopics.get('/:id', topicController.getCoupleTopicById)

routerCoupleTopics.put('/:id', topicController.updateCoupleTopic)

routerCoupleTopics.delete('/:id', topicController.deleteCoupleTopic)

module.exports = routerCoupleTopics;