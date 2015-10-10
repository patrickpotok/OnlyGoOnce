'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = require('./../user/user.model');

var RestaurantLogsSchema = new Schema({
  user: { type: String, ref: 'User' },
  response: {}
})

module.exports = mongoose.model('RestaurantLogs', RestaurantLogsSchema);