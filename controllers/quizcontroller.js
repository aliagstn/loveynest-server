"use strict";

const { User, UserQuiz, UserQuestion, QuizCategory, sequelize } = require("../models");
const { Op } = require("sequelize");

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
            console.log(quizes);
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
            let AuthorId = req.user.id;
            AuthorId = +AuthorId;
            const user = await User.findByPk(+req.user.id, { transaction: t });
            console.log(req.body, req.user);
            const CoupleId = +user.CoupleId;

            const { question1, question2, question3, question4, question5, quiz } = req.body;
            console.log(req.body, req.user);
            const { title, QuizCategoryId } = quiz;
            if (!question1 && !question2 && !question3 && !question4 && !question5) {
                throw { code: 400 };
            }

            const qc = await QuizCategory.findOne(
                {
                    where: {
                        id: +QuizCategoryId,
                    },
                },
                { transaction: t }
            );
            if (!qc) {
                throw { code: 404 };
            }

            if (!title) {
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
                    if (Object.keys(questionObj[key]).length === 0) {
                        delete questionObj[key];
                    } else {
                        questionObj[key].QuizId = userQuiz.id;
                        question.push(questionObj[key]);
                    }
                }
                const userQuestions = await UserQuestion.bulkCreate(question, { transaction: t });

                await t.commit();

                res.status(201).json({
                    message: "Quiz create successfully",
                    userQuestions,
                });
            }
        } catch (error) {
            console.log(error);
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
                    let query = {
                        responsePartner: answer1,
                    };
                    answer1 === UserQuestions[0].answer ? (query.valuePartner = true) : (query.valuePartner = false);

                    await UserQuestion.update(
                        query,
                        {
                            where: {
                                id: UserQuestions[0].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                if (answer2) {
                    let query = {
                        responsePartner: answer2,
                    };

                    await UserQuestion.update(
                        query,
                        {
                            where: {
                                id: UserQuestions[1].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                if (answer3) {
                    let query = {
                        responsePartner: answer3,
                    };
                    answer3 === UserQuestions[2].answer ? (query.valuePartner = true) : (query.valuePartner = false);
                    await UserQuestion.update(
                        query,
                        {
                            where: {
                                id: UserQuestions[2].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                if (answer4) {
                    let query = {
                        responsePartner: answer4,
                    };
                    answer4 === UserQuestions[3].answer ? (query.valuePartner = true) : (query.valuePartner = false);
                    await UserQuestion.update(
                        query,
                        {
                            where: {
                                id: UserQuestions[3].id,
                            },
                        },
                        { transaction: t }
                    );
                }
                if (answer5) {
                    let query = {
                        responsePartner: answer5,
                    };
                    answer5 === UserQuestions[4].answer ? (query.valuePartner = true) : (query.valuePartner = false);
                    await UserQuestion.update(
                        query,
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

    //* GET ALL USER QUIZ BY COUPLE ID DONE
    // question dari partner & status done
    static async getAllUserQuizByCoupleIdDone(req, res, next) {
        try {
            let AuthorId = req.user.id;
            AuthorId = +AuthorId;
            const user = await User.findByPk(AuthorId);
            const CoupleId = +user.CoupleId;

            const allUserQuiz = await UserQuiz.findAll({
                order: [["id", "ASC"]],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                where: {
                    CoupleId,
                    status: "done",
                    AuthorId: {
                        [Op.not]: +AuthorId,
                    },
                },
            });
            res.status(200).json(allUserQuiz);
        } catch (error) {
            next(error);
        }
    }

    //* GET ALL USER QUIZ BY COUPLE ID NOT DONE
    static async getAllUserQuizByCoupleIdNotDone(req, res, next) {
        try {
            let AuthorId = req.user.id; //? didapat dari authN
            AuthorId = +AuthorId;
            // let AuthorId = 3
            // const user = await User.findByPk(+req.user.id);
            const user = await User.findByPk(AuthorId);
            // console.log(user, '<<<< USER');
            // console.log(user.CoupleId, '<<<<');
            const CoupleId = +user.CoupleId;
            const allUserQuiz = await UserQuiz.findAll({
                order: [["id", "ASC"]],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                where: {
                    CoupleId,
                    status: {
                        [Op.not]: "done",
                    },
                    AuthorId: {
                        [Op.not]: AuthorId,
                    },
                },
                include: QuizCategory,
            });

            res.status(200).json(allUserQuiz);
        } catch (error) {
            next(error);
        }
    }

    // questions PUNYA KITA
    static async getAllUserQuizByUserId(req, res, next) {
        try {
            const { id, CoupleId } = req.user;

            const allUserQuiz = await UserQuiz.findAll({
                order: [["id", "ASC"]],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                where: {
                    CoupleId: +CoupleId,
                    AuthorId: +id,
                },
                include: QuizCategory,
            });

            res.status(200).json(allUserQuiz);
        } catch (error) {
            next(error);
        }
    }

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
