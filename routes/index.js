const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorhandler");
router.use("/users", require("./users"));
router.use("/couple", require("./couple"));
router.use("/appquiz", require("./appquiz"));
router.use("/userquiz", require("./userquiz"));
router.use(errorHandler);
module.exports = router;
