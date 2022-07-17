const router = require('express').Router()
const QuizController = require('../controllers/quiz-controller')

router.get('/quizes', QuizController.getQuiz)
router.post('/quiz', QuizController.createQuiz)
// router.get('/quiz/categories', QuizController.createQuiz)
router.patch('/quiz/:quizId/:questionId', QuizController.updateResponseQuiz)
router.get('/quiz/:quizId', QuizController.getQuizById)
router.post('/quiz/:quizId', QuizController.createQuestion)
router.get('/quiz/:quizId/total-score', QuizController.totalScore)

module.exports = router

