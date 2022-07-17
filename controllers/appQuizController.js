"use strict";
const { Couple, User, AppQuiz, AppQuizResult } = require("../models");

class AppQuizControl {
  static async getAppQuiz(req, res, next) {
    try {
      const quizList = await AppQuiz.findAll();

      // console.log(quizList[0].question);
      res.status(200).json({
        statusCode: 200,
        quizList,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "ISA",
      });
    }
  }

  static async createResult(req, res, next) {
    try {
      const QuizId = 1;
      const { responseUser, UserId, coupleId } = req.body;
      let newResult = { responseUser, QuizId, UserId, coupleId };
      const resultQuiz = await AppQuizResult.create(newResult);

      console.log(resultQuiz);
      res.status(201).json({
        statusCode: 201,
        resultQuiz,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "ISA",
      });
    }
  }
}

module.exports = AppQuizControl;
