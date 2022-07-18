const router = require("express").Router();
const TopicController = require("../controllers/topicscontroller");
router.get("/", TopicController.getAllTopics);
router.post("/", TopicController.addTopic);
router.get("/:id", TopicController.getTopicById);
router.put("/:id", TopicController.updateTopic);
router.delete("/:id", TopicController.deleteTopic);
module.exports = router;
