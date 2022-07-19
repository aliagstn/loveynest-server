const router = require("express").Router();
const QuizController = require("../controllers/quizcontroller");

router.get("/", QuizController.getQuiz);
router.post("/", QuizController.createQuiz);
router.patch("/:quizId/", QuizController.updateResponseQuiz);
router.get("/:quizId", QuizController.getQuizById);
router.get("/:quizId/total-score", QuizController.totalScore);

module.exports = router;
