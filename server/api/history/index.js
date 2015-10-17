'use strict';

var express = require('express');
var controller = require('./history.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:id', controller.show);
router.post('/post-logs',controller.postLogs);
router.post('/go-again',controller.updateGoAgain);
router.post('/invalidate-all',controller.invalidate);

module.exports = router;
