const router = require("express").Router();
const QuizController = require("../controllers/quizcontroller");
const userAuth = require("../middlewares/userAuth");
const authorization = require("../middlewares/authorization");
router.get("/", QuizController.getQuiz);
router.post("/", userAuth, QuizController.createQuiz);
router.get("/myquiz", userAuth, QuizController.getAllUserQuizByUserId)
router.get("/quiz-done", userAuth, QuizController.getAllUserQuizByCoupleIdDone);
router.get("/quiz-notdone", userAuth, QuizController.getAllUserQuizByCoupleIdNotDone);
router.patch("/:quizId/", QuizController.updateResponseQuiz);
router.get("/:quizId", QuizController.getQuizById);
router.get("/:quizId/total-score", QuizController.totalScore);

module.exports = router;
