const router = require("express").Router();
const CoupleController = require("../controllers/couplecontroller");

router.get("/", CoupleController.getAllCouples);
// router.get("/:id", CoupleController.getCoupleById);
router.get("/:id/:UserId", CoupleController.findMyPartner)

module.exports = router;
