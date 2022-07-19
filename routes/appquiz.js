"use strict";
const express = require("express");
const router = require("express").Router();
const AppQuizControl = require("../controllers/appquizcontroller");
const userAuthentication = require("../middlewares/userauthentication");

router.get("/", AppQuizControl.getAppQuiz);

router.get("/result", AppQuizControl.getResult);
router.post("/result", userAuthentication, AppQuizControl.createResult);

router.get("/result/:id", AppQuizControl.getResultByUser);

module.exports = router;
