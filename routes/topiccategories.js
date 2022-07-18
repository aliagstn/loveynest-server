const router = require("express").Router();
const TopicController = require("../controllers/topicscontroller");

router.get("/", TopicController.getAllCategory);

router.post("/", TopicController.addCategory);

router.get("/:id", TopicController.getCategoryById);

router.put("/:id", TopicController.updateCategory);

router.delete("/:id", TopicController.deleteCategory);

module.exports = router;
