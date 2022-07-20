const express = require("express");
const routerTopics = express.Router();
const topicController = require("../controllers/topicscontroller");
const userAuthentication = require("../middlewares/userAuthentication");

routerTopics.get("/", userAuthentication, topicController.getAllTopics);

routerTopics.post("/", userAuthentication, topicController.addCoupleTopics);

routerTopics.get("/:id", topicController.getTopicById);

routerTopics.put("/:id", topicController.updateTopic);

routerTopics.delete("/:id", topicController.deleteTopic);

module.exports = routerTopics;
