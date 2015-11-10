'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = require('./../user/user.model');
var Restaurant = require('./../restaurant/restaurant.model');

var HistorySchema = new Schema({
  restaurant_id : { type: String, ref: 'Restaurant' },
  user_id       : { type: String, ref: 'User' },
  time          : { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', HistorySchema);
