"use strict";
const express = require("express");
const routerApp = express.Router();
const AppQuizControl = require("../controllers/appQuizController");

routerApp.get("/quiz", AppQuizControl.getAppQuiz);
routerApp.get("/results", AppQuizControl.getResult);
routerApp.post("/results", AppQuizControl.createResult);

routerApp.get("/results/:id", AppQuizControl.getResultByUser);

module.exports = routerApp;
