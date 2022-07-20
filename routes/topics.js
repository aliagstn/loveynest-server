const express = require("express");
const routerTopics = express.Router();
const topicController = require("../controllers/topicscontroller");
const userAuthentication = require("../middlewares/userAuthentication");

routerTopics.get("/", userAuthentication, topicController.getAllTopics);

routerTopics.post("/", userAuthentication, topicController.addCoupleTopics);

module.exports = routerTopics;
