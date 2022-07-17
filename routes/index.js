const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/couple", require("./couple"));
router.use("/appquiz", require("./appquiz"));
router.use("/userquiz", require("./userquiz"));

module.exports = router;
