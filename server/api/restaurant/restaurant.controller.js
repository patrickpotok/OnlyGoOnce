'use strict';

var _ = require('lodash');
var https = require('https');
var Restaurant = require('./restaurant.model');
var RestaurantLogs = require('./restaurantlogs.model');
var User = require('./../user/user.model');
var History = require('../history/history.model');
var config = require('../../config/local.env.js');

// Get list of histories
exports.index = function(req, res) {
  var userId = req.user && req.user._id;
  var latitude = req.query.latitude
  var longitude = req.query.longitude
  var number = parseInt(req.query.number);
  var apiKey = config.GOOGLE_MAPS_API_KEY;
  var baseURI = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  var locationParam = '&location=' + req.query.latitude + ',' + req.query.longitude;
  var additionalParams = '&types=restaurant&rankby=distance&opennow=true';
  var url = baseURI + 'key=' + apiKey + locationParam + additionalParams;
  var includeGoAgain = req.query.includeGoAgain
  https.get(url, function(response) {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      var responseJson = JSON.parse(str);
      History.find({ user: userId }, function (err, histories) {
        if (err) { return handleError(res, err); }

        // Filter out restaurants already visited
        var filteredResults = responseJson.results.filter(function(x) {
          return histories.indexOf(x) < 0;
        });

        var shuffledResults = knuthShuffle(filteredResults);
        var resultsToReturn = shuffledResults.slice(0, number);

        return res.json(200, resultsToReturns);
      })
    });
  });
}

exports.getLogs = function(req, res) {
  RestaurantLogs.find(function (err, logs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(logs);
  });
}

exports.getRestaurants = function(req, res) {
  Restaurant.find(function (err, restaurants) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(restaurants);
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}

// Link: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function knuthShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
