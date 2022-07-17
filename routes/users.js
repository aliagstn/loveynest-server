const express = require('express');
const routerUsers = express.Router();
const userController = require('../controllers/users');

routerUsers.post('/', userController.addUser);

routerUsers.get('/', userController.getAllUsers);

routerUsers.get('/:id', userController.getUserById);

routerUsers.put('/:id', userController.updateUser);

routerUsers.patch('/:id', userController.inputPartnerCode);

routerUsers.delete('/:id', userController.deleteUser);

module.exports = routerUsers