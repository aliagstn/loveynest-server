const router = require("express").Router();
const CoupleController = require("../controllers/couplecontroller");
const userAuthentication = require("../middlewares/userauthentication");
const authorization = require("../middlewares/authorization");

router.use(userAuthentication);
router.get("/", CoupleController.getAllCouples);
router.get("/:id/:UserId", CoupleController.findMyPartner)
router.use(authorization);
router.get("/:id", CoupleController.getCoupleById);

module.exports = router;
