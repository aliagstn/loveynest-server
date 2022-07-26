const router = require("express").Router();
const userController = require("../controllers/usercontroller");
const userAuth = require("../middlewares/userAuth");
const authorization = require("../middlewares/authorization");

router.post("/api/upload", userController.postToCloudinary);

router.post("/login", userController.loginUser);

router.post("/", userController.addUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.use(userAuth);
router.use(authorization);

router.patch("/:id", userController.updateUser);

router.patch("/input/:id", userController.inputPartnerCode);

router.patch("/delete/:id", userController.deletePartnerCode);

module.exports = router;
