const express = require('express');
const routerUsers = express.Router();
const userController = require('../controllers/users');
const userAuthentication = require('../middlewares/userAuthentication');

routerUsers.post('/login', userController.loginUser);

routerUsers.post('/', userController.addUser);

routerUsers.get('/', userController.getAllUsers);

routerUsers.get('/:id', userController.getUserById);

routerUsers.use(userAuthentication)

routerUsers.patch('/:id', userController.updateUser);

routerUsers.patch('/input/:id', userController.inputPartnerCode);

routerUsers.patch('/delete/:id', userController.deletePartnerCode)

module.exports = routerUsers