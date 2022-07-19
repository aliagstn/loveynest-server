const router = require("express").Router();
const userController = require("../controllers/usercontroller");
const userAuthentication = require("../middlewares/userauthentication");

router.post("/", userController.loginUser);
router.post("/register", userController.addUser);
// router.use(userAuthentication);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.patch("/:id/:partnerCode", userController.inputPartnerCode);
router.delete("/:id", userController.deleteUser);

module.exports = router;
