const router = require("express").Router();
const CoupleController = require("../controllers/couplecontroller");

router.use(userAuthentication);
router.use(authorization);
router.get("/", CoupleController.getAllCouples);
router.get("/:id", CoupleController.getCoupleById);

module.exports = router;
