"use strict";
const express = require("express");
const router = require("express").Router();
const AppQuizControl = require("../controllers/appquizcontroller");

router.get("/", AppQuizControl.getAppQuiz);
router.use(userAuthentication);
router.use(authorization);
router.get("/result", AppQuizControl.getResult);
router.post("/result", AppQuizControl.createResult);
router.get("/result/:id", AppQuizControl.getResultByUser);

module.exports = router;
