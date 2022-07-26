"use strict";
const express = require("express");
const router = require("express").Router();
const AppQuizControl = require("../controllers/appquizcontroller.js");
const userAuth = require("../middlewares/userAuth");

router.get("/", AppQuizControl.getAppQuiz);

router.get("/result", AppQuizControl.getResult);
router.post("/result", userAuth, AppQuizControl.createResult);

router.get("/result/:id", AppQuizControl.getResultByUser);

module.exports = router;
