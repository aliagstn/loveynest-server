'use strict'


const { UserQuiz, UserQuestion, QuizCategory, sequelize } = require('../models');

class QuizController {
    //* READ ALL QUIZ (/quizes)
    static async getQuiz(req, res, next) {
        try {
            // console.log('masuk');
            const quizes = await UserQuiz.findAll(
                {
                    order: [['id', 'ASC']],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }
            )

            res.status(200).json(quizes)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    //* READ QUIZ BY ID 
    static async getQuizById(req, res, next) {

        try {
            const { quizId: id } = req.params
            const quiz = await UserQuiz.findByPk(Number(id), {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: UserQuestion,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: QuizCategory,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    },

                ]
            })

            res.status(200).json(quiz)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    //* CREATE QUIZZ
    static async createQuiz(req, res, next) {

        const t = await sequelize.transaction()

        try {
            const AuthorId = 1 //? didapat dari authN
            const CoupleId = 1 //? didapat dari authN
            // const QuizCategoryId 
            const { title, QuizCategoryId, question, answer, optionA, optionB } = req.body
            console.log(question, answer, optionA, optionB);

            if (!answer || !question || !optionA || !optionB) {
                throw { name: 'EMPTY_INPUT' }
            }

            const inputQuiz = {
                title, QuizCategoryId: +QuizCategoryId, AuthorId, CoupleId, status: '', totalPoint: 0
            }

            //* Create User Quiz
            const [userQuiz, create] = await UserQuiz.findOrCreate({
                where: inputQuiz
            })
            // console.log(create);

            if (!create) {
                throw { name: 'QUIZ_ALLREADY_EXIST' }
            } else {

                //* Create User Questions
                const inputQuestion = {
                    question,
                    answer,
                    QuizId: userQuiz.id,
                    responsePartner: '',
                    valuePartner: null,
                    optionA,
                    optionB
                }

                const userQuestions = await UserQuestion.create(inputQuestion, { transaction: t })

                await t.commit()

                res.status(201).json({
                    message: "Quizz create successfully"
                })
            }
        } catch (error) {
            console.log(error);
            t.rollback()
            next(error)
        }
    }

    //* UPDATE RESPONSE PARTNER
    static async updateResponseQuiz(req, res, next) {
        const t = await sequelize.transaction()

        try {
            const { responsePartner } = req.body
            const { quizId, questionId } = req.params

            const currentQuestion = await UserQuestion.findByPk(Number(questionId))
            const currentQuiz = await UserQuiz.findByPk(Number(quizId))

            if (!currentQuestion || !currentQuiz) {
                throw { name: 'QUIZ_NOT_FOUND' }
            } else {
                //* SET TOTAL POINT
                let valuePartner = false
                let status
                let totalPoint = 0
                if (responsePartner.toLowerCase() === currentQuestion.answer.toLowerCase()) {
                    valuePartner = true
                    status = "done"
                    totalPoint = 100
                }

                const updateResponsePartner = await UserQuestion.update(
                    {
                        responsePartner,
                        valuePartner,
                    }, {
                    where: {
                        id: Number(questionId)
                    }
                }, { transaction: t })

                const updateStatusQuiz = await UserQuiz.update(
                    {
                        status,
                        totalPoint
                    }, {
                    where: {
                        id: Number(quizId)
                    }
                }, { transaction: t })

                await t.commit()

                res.status(200).json({
                    message: "Response has been updated"
                })
            }


        } catch (error) {
            console.log(error);
            t.rollback()
            next(error)
        }
    }
}

module.exports = QuizController