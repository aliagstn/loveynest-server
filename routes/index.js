const express = require('express');
const router = express.Router();
const routerUsers = require('./users')
const routerTopics = require('./topics')

router.use('/users', routerUsers)

router.use('/topics', routerTopics)

module.exports = router;