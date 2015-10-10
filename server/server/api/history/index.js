'use strict';

var express = require('express');
var controller = require('./history.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/post-logs',controller.postLogs);

module.exports = router;
