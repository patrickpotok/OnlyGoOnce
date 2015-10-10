'use strict';

var _ = require('lodash');
//var Restaurant = require('./restaurant.model');
var http = require('http')
var RestaurantLogs = require('./../restaurant/restaurantlogs.model');
var User = require('./../user/user.model');
var Restaurant = require('./../restaurant/restaurant.model');
var History = require('../history/history.model');

// Get list of histories
exports.index = function(req, res) {
  var userId = req.user && req.user._id;
  var latitude = req.query.latitude
  var longitude = req.query.longitude
  var number = parseInt(req.query.number);
  var url = 'http://places.cit.api.here.com/places/v1/browse?at=' + req.query.latitude + ',' + req.query.longitude + '&app_id=evk3TrU4UcresAseG8Da&app_code=z4yYohROherMZ57eHTsQUg&pretty=true&cat=restaurant';
  var includeGoAgain = req.query.includeGoAgain
  http.get(url, function(response) {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });
    // TODO: FILTER by previous(CROSS CHECK WITH HISTORY MODEL)
    response.on('end', function () {
      var result = JSON.parse(str);
      var result_list = []
      var filter = []

      History.find({user:userId}, function (err, histories) {
          if(err) { return handleError(res, err); }
          var countFiltered = 0;

          for(var i = 0; i < histories.length; i++){
              if( (includeGoAgain == "true") && (histories[i].goAgain == "true") ){

              }
              else{
                filter[countFiltered] = histories[i].restaurant_id;
                countFiltered++;
              }
          }

          for(var i = 0; i < result.results.items.length; i++){
            if(filter.indexOf(result.results.items[i].id) == -1){ //Not in filter
              result_list[i] = result.results.items[i];
              if(result_list.length == number){
                break;
              }
            }
          }
          // Store Restaurant information if need to. Make more efficient in future
          // Currently stores as we query
          for (var i = 0; i < result.results.items.length; i++){
            Restaurant.update(
                {external_id: result.results.items[i].id},
                {
                  external_id: result.results.items[i].id,
                  information: result.results.items[i]
                },
                {upsert: true},
                function(err, restaurant){
                  if(err) { return handleError(res, err); }
                }
            )
          }
          return res.json(200, result_list);
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
