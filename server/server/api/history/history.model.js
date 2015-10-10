'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = require('./../user/user.model');

var HistorySchema = new Schema({
  external_id: String,
  time: { type: Date, default: Date.now },
  startingLocation: {},
  user: { type: String, ref: 'User' },
});

module.exports = mongoose.model('History', HistorySchema);