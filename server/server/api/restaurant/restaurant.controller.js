'use strict';

var _ = require('lodash');
//var Restaurant = require('./restaurant.model');
var http = require('http')
var RestaurantLogs = require('./../restaurant/restaurantlogs.model');
var User = require('./../user/user.model');
var Restaurant = require('./../restaurant/restaurant.model');
var History = require('../history/history.model');

// Taken from: https://raw.githubusercontent.com/kvz/phpjs/master/functions/array/array_rand.js
function array_rand(input, num_req) {
  //  discuss at: http://phpjs.org/functions/array_rand/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_rand( ['Kevin'], 1 );
  //   returns 1: 0

  var indexes = [];
  var ticks = num_req || 1;
  var checkDuplicate = function(input, value) {
    var exist = false,
      index = 0,
      il = input.length;
    while (index < il) {
      if (input[index] === value) {
        exist = true;
        break;
      }
      index++;
    }
    return exist;
  };

  if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
    while (true) {
      var rand = Math.floor((Math.random() * input.length));
      if (indexes.length === ticks) {
        break;
      }
      if (!checkDuplicate(indexes, rand)) {
        indexes.push(rand);
      }
    }
  } else {
    indexes = null;
  }

  return ((ticks == 1) ? indexes.join() : indexes);
}

// Get list of histories
exports.index = function(req, res) {
  var userId = req.user && req.user._id;
  var latitude = req.query.latitude
  var longitude = req.query.longitude
  var number = parseInt(req.query.number);
  var url = 'http://places.cit.api.here.com/places/v1/browse?at=' + req.query.latitude + ',' + req.query.longitude + '&app_id=evk3TrU4UcresAseG8Da&app_code=z4yYohROherMZ57eHTsQUg&pretty=true&cat=restaurant&size=100';
  var includeGoAgain = req.query.includeGoAgain
  console.log(url)
  http.get(url, function(response) {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      var result = JSON.parse(str);
      var result_list = []
      var filter = []
      console.log(result.results.items.length)
      

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
          var result_index = 0;
          for(var i = 0; i < result.results.items.length; i++){
            if(filter.indexOf(result.results.items[i].id) == -1){ //Not in filter
              result_list[result_index] = result.results.items[i];
              result_index++;
            }
          }

          var answer = [];
          var rando = array_rand(result_list, number);
          for (var i = 0; i < rando.length; i++) {
            answer[i] = result_list[rando[i]];
          }
          result_list = answer;

          // Store Restaurant information if need to. Make more efficient in future
          // Currently stores as we query
          for (var i = 0; i < result.results.items.length; i++){
            console.log( result.results.items[i].id)
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
