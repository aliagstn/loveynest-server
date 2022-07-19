const router = require("express").Router();
const CoupleController = require("../controllers/couplecontroller");
const userAuthentication = require("../middlewares/userauthentication");
const authorization = require("../middlewares/authorization");

router.use(userAuthentication);
router.get("/", CoupleController.getAllCouples);
router.use(authorization);
router.get("/:id", CoupleController.getCoupleById);

module.exports = router;
