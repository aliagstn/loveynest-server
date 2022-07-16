const router = require('express').Router()
const QuizController = require('../controllers/quiz-controller')

router.get('/quizes', QuizController.getQuiz)
router.post('/quiz', QuizController.createQuiz)
// router.post('/quiz-categories', QuizController.createQuiz)
router.get('/quiz/:quizId', QuizController.getQuizById)
// router.patch('/quiz/:quizId', QuizController.updateResponseQuiz)
// router.get('/total-score', QuizController.totalScore)

module.exports = router

