const router = require("express").Router();
const CoupleController = require("../controllers/couplecontroller");

router.get("/", CoupleController.getAllCouple);

module.exports = router;
