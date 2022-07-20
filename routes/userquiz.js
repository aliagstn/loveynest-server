const router = require("express").Router();
const QuizController = require("../controllers/quizcontroller");
const userAuthentication = require("../middlewares/userauthentication");
const authorization = require("../middlewares/authorization");
router.get("/", QuizController.getQuiz);
router.post("/", userAuthentication, QuizController.createQuiz);
router.get("/myquiz", userAuthentication, QuizController.getAllUserQuizByUserId)
router.get("/quiz-done", userAuthentication, QuizController.getAllUserQuizByCoupleIdDone);
router.get("/quiz-notdone", userAuthentication, QuizController.getAllUserQuizByCoupleIdNotDone);
router.patch("/:quizId/", QuizController.updateResponseQuiz);
router.get("/:quizId", QuizController.getQuizById);
router.get("/:quizId/total-score", QuizController.totalScore);

module.exports = router;
