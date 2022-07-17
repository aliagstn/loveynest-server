const express = require("express");
const router = express.Router();
const routerUsers = require("./users");

router.use("/users", routerUsers);
router.use("/appquiz", require("./app-quiz"));
router.use("/userquiz", require("./quiz-router"));

module.exports = router;
