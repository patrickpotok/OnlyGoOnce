'use strict';

var _ = require('lodash');
var History = require('./history.model');
var Restaurant = require('./../restaurant/restaurant.model');

// Get list of histories
exports.index = function(req, res) {
  History.find(function (err, histories) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(histories);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  History.create(req.body, function(err, history) {
    if(err) { return handleError(res, err); }
    console.log(history)
    return res.status(201).json(history);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.postLogs = function(req, res) {
  var restaurant_id = req.body.restaurant_id;
  console.log(req);
  Restaurant.find( { external_id : restaurant_id } ,function (err, restaurant) {
    if( err || !restaurant.length) {
        err = err || "No restaurant found with that id";
        return handleError(res, err);
    }
    console.log(restaurant);
    History.create({user:req.user, restaurant_id:restaurant[0]}, function(err, history) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(history);
    })
  });
}
