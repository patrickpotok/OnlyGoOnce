'use strict';

var express = require('express');
var controller = require('./history.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/post-logs', controller.postLogs);
router.post('/invalidate-all', controller.invalidate);

module.exports = router;
