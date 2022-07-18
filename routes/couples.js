const express = require('express');
const routerCouples = express.Router();
const coupleController = require('../controllers/couples');

routerCouples.get('/', coupleController.getAllCouples);

routerCouples.get('/:id', coupleController.getCoupleById);

module.exports = routerCouples