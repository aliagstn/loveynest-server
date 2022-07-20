const express = require("express");
const routerTopics = express.Router();
const topicController = require("../controllers/topicscontroller");
const userAuthentication = require("../middlewares/userAuthentication");

routerTopics.get("/", userAuthentication, topicController.getAllTopics);

routerTopics.post("/", userAuthentication, topicController.addCoupleTopics);

<<<<<<< HEAD
=======
// routerTopics.get("/:id", topicController.getTopicById);

// routerTopics.put("/:id", topicController.updateTopic);

// routerTopics.delete("/:id", topicController.deleteTopic);

>>>>>>> a1918b5447f7ca0e37031fa5e87aa58f0e4f52f3
module.exports = routerTopics;
