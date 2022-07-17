"use strict";
const express = require("express");
const routerApp = express.Router();
const AppQuizControl = require("../controllers/appQuizController");

routerApp.get("/getQuiz", AppQuizControl.getAppQuiz);
routerApp.post("/createQuiz", AppQuizControl.createResult);

module.exports = routerApp;
