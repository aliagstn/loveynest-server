const express = require("express");
const router = express.Router();
router.use("/users", require("./users"));
router.use("/topics", require("./topics"));
router.use("/couples", require("./couple"));
router.use("/coupleTopics", require("./coupletopics"));
router.use("/categories", require("./topiccategories"));
router.use("/appquiz", require("./appquiz"));
router.use("/userquiz", require("./userquiz"));

module.exports = router;
