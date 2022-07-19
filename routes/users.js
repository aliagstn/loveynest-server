const router = require("express").Router();
const userController = require("../controllers/usercontroller");
const userAuthentication = require("../middlewares/userauthentication");

router.post('/api/upload', userController.postToCloudinary)

router.post('/login', userController.loginUser);

router.post('/', userController.addUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.use(userAuthentication)

router.patch('/:id', userController.updateUser);

router.patch('/input/:id', userController.inputPartnerCode);

router.patch('/delete/:id', userController.deletePartnerCode)

module.exports = router;
