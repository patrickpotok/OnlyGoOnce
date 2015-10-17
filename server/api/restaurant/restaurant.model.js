'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  external_id: {type: String},
  information: {}
});


module.exports = mongoose.model('Restaurant', RestaurantSchema);