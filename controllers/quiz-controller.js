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
        }
    }

    // //* CREATE QUIZZ
    static async createQuiz(req, res, next) {

        const t = await sequelize.transaction()

        try {
            const AuthorId = 1 //? didapat dari authN
            const CoupleId = 1 //? didapat dari authN
            // const QuizCategoryId 
            const { title, QuizCategoryId, question, answer } = req.body

            const inputQuiz = {
                title, QuizCategoryId: +QuizCategoryId, AuthorId, CoupleId, status: '', totalPoint: 0
            }
            console.log('batas 1');
            //* Create User Quiz
            const [userQuiz, create] = await UserQuiz.findOrCreate({ where: inputQuiz })
            console.log('batas 2');
            if (!create) {
                throw { name: 'QUIZ_ALLREADY_EXIST' }
            } else {

                //* Create User Questions
                const inputQuestion = {
                    question,
                    answer,
                    quizId: userQuiz.id,
                    responsePartner: '',
                    valuePartner: null
                }
                console.log('batas 3');
                const userQuestions = await UserQuestion.create(inputQuestion, { transaction: t })

                await t.commit()

                res.status(201).json({
                    message: "Quizz create successfully"
                })
            }
        } catch (error) {
            console.log(error);
            t.rollback()
        }
    }

    // static async updateResponseQuiz(req, res, next) {
    //     const t = await sequelize.transaction()

    //     try {

    //     } catch (error) {
    //         console.log(error);
    //         t.rollback()
    //     }
    // }
}

module.exports = QuizController