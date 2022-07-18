const router = require("express").Router();
const TopicController = require("../controllers/topicscontroller");

router.get("/", TopicController.allCoupleTopics);

router.post("/", TopicController.addCoupleTopics);

router.get("/:id", TopicController.getCoupleTopicById);

router.put("/:id", TopicController.updateCoupleTopic);

router.delete("/:id", TopicController.deleteCoupleTopic);

module.exports = router;
