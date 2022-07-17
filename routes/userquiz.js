const router = require("express").Router();
const QuizController = require("../controllers/quizcontroller");

router.get("/", QuizController.getQuiz);
router.post("/", QuizController.createQuiz);
// router.get('/quiz/categories', QuizController.createQuiz)
router.patch("/:quizId/:questionId", QuizController.updateResponseQuiz);
router.get("/:quizId", QuizController.getQuizById);
router.post("/:quizId", QuizController.createQuestion);
router.get("/:quizId/total-score", QuizController.totalScore);

module.exports = router;
