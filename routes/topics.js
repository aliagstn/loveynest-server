const express = require("express");
const routerTopics = express.Router();
const topicController = require("../controllers/topicscontroller");
const userAuth = require("../middlewares/userAuth");

routerTopics.get("/", userAuth, topicController.getAllTopics);

routerTopics.post("/", userAuth, topicController.addCoupleTopics);

// routerTopics.get("/:id", topicController.getTopicById);

// routerTopics.put("/:id", topicController.updateTopic);

// routerTopics.delete("/:id", topicController.deleteTopic);

module.exports = routerTopics;
