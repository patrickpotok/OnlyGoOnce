angular.module('starter.controllers')
.controller('BrowseHereCtrl', function($scope, geolocation, ApiService, $window, $stateParams) {
  $scope.coords = $stateParams.coords;
  $scope.restaurants = []

  $scope.back = function(){
    $window.history.back();
  }

  $scope.getParamsForState = function(index){
    return {'restaurant' : $scope.restaurants[index]}
  }

  $scope.remove_br = function(address){
    return address.replace("<br/>", ", ")
  }

  geolocation.getLocation().then(function(data){
   $scope.coords =  $stateParams.coords || {lat:data.coords.latitude, long:data.coords.longitude};
    ApiService.getRestaurants($scope.coords.lat, $scope.coords.long, 5)
    .success(function(response){
      for (var i = 0; i < 5; i++){
        $scope.restaurants.push(response[i])
      }})
    });
})

.controller('ConfirmCtrl', function($scope, geolocation, ApiService, $stateParams, $window){
  $scope.coords = {}
  $scope.restaurant = {}
  $scope.markers = {locations: []}
  $scope.goAgain =false;

  $scope.back = function(){
    $window.history.back();
  }

  $scope.getParamsForState = function(){
    return {'restaurant' : $scope.restaurant}
  }

  $scope.back = function(){
    $window.history.back();
  }

  $scope.restaurant = $stateParams.restaurant

  $scope.saveGoAgain= function(){
    ApiService.updateGoAgain($scope.restaurant.id, $scope.goAgain)
    .success(function(response){
      console.log(response)
    })
  }

  geolocation.getLocation().then(function(data){
   $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};

    ApiService.getRestaurants(data.coords.latitude, data.coords.longitude, 1)
    .success(function(response){
      $scope.restaurant = $stateParams.restaurant || response[0]

      $scope.markers = {
      locations: [
        {
          coordinates: {
            lat: $scope.restaurant.position[0],
            lng: $scope.restaurant.position[1]
          },
          icon: {
            window: {
              template: $scope.restaurant.title
            }
          },
          id: 2
        },
        {
          coordinates: {
            lat: data.coords.latitude,
            lng: data.coords.longitude
          },
          icon: {
            window: {
              template: "You are here!"
            }
          },
          id: 2
        }
      ],
      icon: {
        window: {
          templateUrl: 'development/templates/window.html'
        }

      }
    };
    ApiService.postLogs($scope.restaurant.id)
  })

  });

   $scope.$watch('coords', function(newValue, oldValue) {
     if (newValue){
       $scope.map = {
         zoom : 15,
         center : {
           lng: $scope.coords.long,
           lat: $scope.coords.lat
         }
       };
     }
   })
})