const router = require("express").Router();
const CoupleController = require("../controllers/couplecontroller");
const userAuthentication = require("../middlewares/userauthentication");

router.use(userAuthentication);
router.get("/", CoupleController.getAllCouples);
router.get("/:id", CoupleController.getCoupleById);
router.get("/:id/:UserId", CoupleController.findMyPartner);

module.exports = router;
