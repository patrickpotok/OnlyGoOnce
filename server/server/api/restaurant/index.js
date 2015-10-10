'use strict';

var express = require('express');
var controller = require('./restaurant.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/get-logs', controller.getLogs);
router.get('/get-all-restaurants', controller.getRestaurants);

//router.get('/:id', controller.show);
//router.post('/', controller.create);

module.exports = router;