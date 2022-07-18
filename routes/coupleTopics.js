const express = require('express');
const routerCoupleTopics = express.Router();
const topicController = require('../controllers/topics');
const userAuthentication = require('../middlewares/userAuthentication');

routerCoupleTopics.get('/', topicController.allCoupleTopics);

routerCoupleTopics.get('/:id', topicController.getCoupleTopicById)

routerCoupleTopics.put('/:id', topicController.updateCoupleTopic)

routerCoupleTopics.delete('/:id', topicController.deleteCoupleTopic)

routerCoupleTopics.post('/', userAuthentication, topicController.addCoupleTopics);

module.exports = routerCoupleTopics;