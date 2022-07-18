"use strict";

const { UserQuiz, UserQuestion, QuizCategory, sequelize } = require("../models");

class QuizController {
    //* READ ALL QUIZ (/quizes)
    static async getQuiz(req, res, next) {
        try {
            const quizes = await UserQuiz.findAll({
                order: [["id", "ASC"]],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            res.status(200).json(quizes);
        } catch (error) {
            next(error);
        }
    }

    //* READ QUIZ BY ID
    static async getQuizById(req, res, next) {
        try {
            const { quizId: id } = req.params;
            const quiz = await UserQuiz.findByPk(Number(id), {
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: UserQuestion,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    {
                        model: QuizCategory,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                ],
            });

            if (!quiz) {
                throw { name: "QUIZ_NOT_FOUND" };
            } else {
                res.status(200).json(quiz);
            }
        } catch (error) {
            next(error);
        }
    }

    //* CREATE QUIZ
    static async createQuiz(req, res, next) {
        const t = await sequelize.transaction();

        try {
            const AuthorId = 1; //? didapat dari authN
            const CoupleId = 1; //? didapat dari authN

            const { question1, question2, question3, question4, question5, quiz } = req.body;
            const { title, QuizCategoryId } = quiz;
            if (!question1 && !question2 && !question3 && !question4 && !question5) {
                throw { code: 400 };
            }

            const inputQuiz = {
                title,
                QuizCategoryId: +QuizCategoryId,
                AuthorId,
                CoupleId,
                status: "",
                totalPoint: 0,
            };

            const [userQuiz, create] = await UserQuiz.findOrCreate({
                where: inputQuiz,
                transaction: t,
            });

            if (!create) {
                throw { name: "QUIZ_ALLREADY_EXIST" };
            } else {
                //* Create User Questions
                const questionObj = { question1, question2, question3, question4, question5 };
                let question = [];
                for (const key in questionObj) {
                    questionObj[key].QuizId = userQuiz.id;
                    question.push(questionObj[key]);
                }

                const userQuestions = await UserQuestion.bulkCreate(question, { transaction: t });

                await t.commit();

                res.status(201).json({
                    message: "Quizz create successfully",
                });
            }
        } catch (error) {
            t.rollback();
            next(error);
        }
    }

    //* UPDATE RESPONSE PARTNER
    static async updateResponseQuiz(req, res, next) {
        const t = await sequelize.transaction();

        try {
            const { answer1, answer2, answer3, answer4, answer5 } = req.body;
            const { quizId } = req.params;

            const quiz = await UserQuiz.findByPk(
                Number(quizId),
                {
                    include: [UserQuestion],
                    where: {
                        QuizId: quizId,
                    },
                    order: [["id", "ASC"]],
                },
                { transaction: t }
            );
            if (!quiz) {
                throw { name: "QUIZ_NOT_FOUND" };
            } else if (quiz.status === "done") {
                throw { name: "QUIZ_DONE" };
            } else {
                let { UserQuestions } = quiz;
                if (answer1) {
                    await UserQuestion.update(
                        {
                            responsePartner: answer1,
                        },
                        {
                            where: {
                                id: UserQuestions[0].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                if (answer2) {
                    await UserQuestion.update(
                        {
                            responsePartner: answer2,
                        },
                        {
                            where: {
                                id: UserQuestions[1].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                if (answer3) {
                    await UserQuestion.update(
                        {
                            responsePartner: answer3,
                        },
                        {
                            where: {
                                id: UserQuestions[2].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                if (answer4) {
                    await UserQuestion.update(
                        {
                            responsePartner: answer4,
                        },
                        {
                            where: {
                                id: UserQuestions[3].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                if (answer5) {
                    await UserQuestion.update(
                        {
                            responsePartner: answer5,
                        },
                        {
                            where: {
                                id: UserQuestions[4].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                const afterUpdateQuiz = await UserQuiz.findByPk(
                    Number(quizId),
                    {
                        include: [UserQuestion],
                        where: {
                            QuizId: quizId,
                        },
                        order: [["id", "ASC"]],
                    },
                    { transaction: t }
                );
                let point = 0;

                afterUpdateQuiz.UserQuestions.forEach((el) => {
                    if (el.responsePartner === el.answer) {
                        point += 100;
                    }
                });
                const updateStatusQuiz = await UserQuiz.update(
                    {
                        status: "done",
                        totalPoint: point,
                    },
                    {
                        where: {
                            id: Number(quizId),
                        },
                    },
                    { transaction: t }
                );

                await t.commit();
                res.status(200).json({
                    message: "Response has been updated",
                });
            }
        } catch (error) {
            t.rollback();
            next(error);
        }
    }

    //* CREATE NEW QUESTION
    // static async createQuestion(req, res, next) {
    //     const t = await sequelize.transaction();

    //     try {
    //         const { quizId } = req.params;
    //         const { question, answer, optionA, optionB } = req.body;

    //         if (!answer || !question || !optionA || !optionB) {
    //             throw { name: "EMPTY_INPUT" };
    //         } else {
    //             const inputQuestion = {
    //                 question,
    //                 answer,
    //                 QuizId: quizId,
    //                 responsePartner: "",
    //                 valuePartner: null,
    //                 optionA,
    //                 optionB,
    //             };

    //             const [userQuestions, create] = await UserQuestion.findOrCreate({
    //                 where: inputQuestion,
    //                 transaction: t,
    //             });

    //             if (!create) {
    //                 throw { name: "QUESTION_ALLREADY_EXIST" };
    //             } else {
    //                 //* UPDATE STATUS
    //                 const updateStatusQuiz = await UserQuiz.update(
    //                     {
    //                         status: "Undone",
    //                     },
    //                     {
    //                         where: {
    //                             id: Number(quizId),
    //                         },
    //                     },
    //                     { transaction: t }
    //                 );

    //                 await t.commit();

    //                 res.status(201).json({
    //                     message: "Question create successfully",
    //                 });
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         t.rollback();
    //         next(error);
    //     }
    // }

    //* GET TOTAL SCORE

    static async totalScore(req, res, next) {
        try {
            const { quizId: id } = req.params;
            const quiz = await UserQuiz.findByPk(Number(id));

            if (!quiz) {
                throw { name: "QUIZ_NOT_FOUND" };
            } else {
                res.status(200).json({
                    totalPoint: quiz.totalPoint,
                    statusQuiz: quiz.status,
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = QuizController;
