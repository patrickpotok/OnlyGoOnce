'use strict';

angular.module('starter')
  .factory('ApiService', ApiService);
  
function ApiService($http) {
    var service = {},
        restaurantURL= '/api/restaurant/',
       historyURL= '/api/history/';

    service.getRestaurants =  function(latitude, longitude, number){
      return $http.get(restaurantURL + '?latitude='+ latitude + '&longitude=' + longitude + '&number=' + number);
    }
    
    service.getAllRestaurants = function(){
      return $http.get(restaurantURL + 'get-all-restaurants');
    }
      
    service.pushHistory = function(restaurant_id, goAgain){
      return $http({
            method: 'POST',
            url: historyURL,
            params : {restaurant_id: restaurant_id,
                      goAgain: goAgain}
        }); 
    }
    
    service.postLogs = function(restaurant_id){
      return $http({
            method: 'POST',
            url: historyURL + 'post-logs',
            params : {restaurant_id: restaurant_id}
        }); 
    }
    
    service.updateGoAgain = function(restaurant_id, goAgain){
      return $http({
            method: 'POST',
            url: historyURL + 'go-again' ,
            params : {restaurant_id: restaurant_id,
                      goAgain: goAgain}
        }); 
    }
    
    
    return service

};
