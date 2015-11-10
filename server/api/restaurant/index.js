'use strict';

var express = require('express');
var controller = require('./restaurant.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/get-logs', controller.getLogs);
router.get('/get-all-restaurants', controller.getRestaurants);

module.exports = router;