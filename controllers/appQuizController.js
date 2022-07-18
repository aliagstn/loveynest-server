"use strict";
const { Couple, User, AppQuiz, AppQuizResult } = require("../models");

class AppQuizControl {
    static async getAppQuiz(req, res, next) {
        try {
            const quizList = await AppQuiz.findAll();
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
            console.log(req.body);
            let newResult = { responseUser, QuizId, UserId, coupleId };
            const resultQuiz = await AppQuizResult.create(newResult);

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

    static async getResult(req, res, next) {
        try {
            const resultList = await AppQuizResult.findAll({
                include: [Couple],
                order: [["id", "ASC"]],
            });

            res.status(200).json({
                statusCode: 200,
                resultList,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "ISA",
            });
        }
    }

    static async getResultByUser(req, res, next) {
        try {
            const userId = +req.params.id;
            const resultByIdList = await AppQuizResult.findAll({
                where: {
                    UserId: userId,
                },
                order: [["id", "DESC"]],
                limit: 7,
            });

            res.status(200).json({
                resultByIdList,
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
