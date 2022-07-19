const express = require('express');
const routerCouples = express.Router();
const coupleController = require('../controllers/couples');
const userAuthentication = require('../middlewares/userAuthentication');

routerCouples.get('/', coupleController.getAllCouples);

routerCouples.get('/:id', coupleController.getCoupleById);

routerCouples.post('/:id', userAuthentication, coupleController.annivDate);

module.exports = routerCouples