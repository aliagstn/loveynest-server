const express = require('express');
const router = express.Router();
const routerUsers = require('./users')
const routerTopics = require('./topics')
const routerCoupleTopics = require('./coupleTopics')
const routerTopicCategories = require('./topicCategories')
const routerCouples = require('./couples')

router.use('/users', routerUsers)

router.use('/topics', routerTopics)

router.use('/coupleTopics', routerCoupleTopics)

router.use('/categories', routerTopicCategories)

router.use('/couples', routerCouples)

module.exports = router;