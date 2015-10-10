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
  Restaurant.find( { external_id : restaurant_id } ,function (err, restaurant) {
    if( err || !restaurant.length) {
        err = err || "No restaurant found with that id";
        return handleError(res, err);
    }
    History.find({restaurant_id:restaurant_id, user:req.user}, function (err, histories) {
      if ( !histories.length ) {
       History.create({user:req.user, restaurant_id:restaurant_id}, function(err, history) {
          if(err) { return handleError(res, err); }
             return res.status(201).json(history);
          })
      }
      else {
        var currentTimesVisited = histories[0].timesVisited + 1;
        History.update( { restaurant_id:restaurant_id, user: req.user},
                        { timesVisited: currentTimesVisited },
                        function (err, histories)
                        {
                              if(err) { return handleError(res, err); }
                              return res.status(200).json(histories);
                        });
      }
    });
  });
}

exports.updateGoAgain = function(req, res) {
  var restaurant_id = req.body.restaurant_id;
  Restaurant.find( { external_id : restaurant_id } ,function (err, restaurant) {
    if( err || !restaurant.length) {
        err = err || "No restaurant found with that id";
        return handleError(res, err);
    }
    History.find({restaurant_id:restaurant_id, user:req.user}, function (err, histories) {
      if ( !histories.length ) {
        return handleError(res, "Restaurant and User Combination not found in database. Ask Justin");

      }
      else {
        History.update( { restaurant_id:restaurant_id, user: req.user},
                        { goAgain: req.body.goAgain },
                        function (err, histories)
                        {
                              if(err) { return handleError(res, err); }
                              return res.status(200).json(histories);
                        });
      }
    });
  });
}
