"use strict";
const express = require("express");
const routerApp = express.Router();
const AppQuizControl = require("../controllers/appquizcontroller");

routerApp.get("/", AppQuizControl.getAppQuiz);
routerApp.get("/result", AppQuizControl.getResult);
routerApp.post("/result", AppQuizControl.createResult);
routerApp.get("/result/:id", AppQuizControl.getResultByUser);

module.exports = routerApp;
