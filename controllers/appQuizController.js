"use strict";
const { Couple, User, AppQuiz, AppQuizResult, sequelize } = require("../models");

class AppQuizControl {
    static async getAppQuiz(req, res, next) {
        try {
            const quizList = await AppQuiz.findAll();
            res.status(200).json(quizList);
        } catch (err) {
            next(err);
        }
    }

    static async createResult(req, res, next) {
        try {
            const t = await sequelize.transaction();
            const QuizId = 1;
            const { responseUser, UserId, CoupleId } = req.body;

            const user = User.findByPk(UserId, { transaction: t });

            if (!user) {
                throw { code: 404 };
            }

            const couple = await Couple.findByPk(CoupleId, { transaction: t });

            if (!couple) {
                throw { code: 404 };
            }

            if (couple.UserId1 === +UserId || couple.UserId2 === +UserId) {
                let newResult = { responseUser, QuizId, UserId, CoupleId };
                const resultQuiz = await AppQuizResult.create(newResult);
                res.status(201).json(resultQuiz);
            } else {
                throw { code: 403 };
            }
        } catch (err) {
            next(err);
        }
    }

    static async getResult(req, res, next) {
        try {
            const resultList = await AppQuizResult.findAll({
                include: [Couple],
                order: [["id", "ASC"]],
            });

            res.status(200).json(resultList);
        } catch (err) {
            next(err);
        }
    }

    static async getResultByUser(req, res, next) {
        try {
            const userId = +req.params.id;
            const user = await User.findOne({
                where: {
                    id: userId,
                },
            });

            if (!user) {
                throw { code: 404 };
            }

            const resultByIdList = await AppQuizResult.findAll({
                where: {
                    UserId: userId,
                },
                order: [["id", "DESC"]],
                limit: 7,
            });

            res.status(200).json(resultByIdList);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AppQuizControl;
