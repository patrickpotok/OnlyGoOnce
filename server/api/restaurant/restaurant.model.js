'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  external_id : { type: String },
  name        : { type: String },
  address     : { type: String },
  location    : {}
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);