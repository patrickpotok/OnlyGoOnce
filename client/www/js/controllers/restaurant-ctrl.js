angular.module('starter.controllers')
.controller('RestaurantCtrl', function($scope,geolocation, ApiService, $window, $stateParams) {
  ApiService.invalidateAll()
  $scope.back = function(){
    $window.history.back();
  }

  $scope.rejectHistory = function(){
      ApiService.postLogs($scope.restaurant.id)
  }

  $scope.coords = {}
  $scope.restaurant = {}
  $scope.restaurant = $stateParams.restaurant;

  $scope.markers = {locations: []}

  $scope.getParamsForState = function(){
    return {'restaurant' : $scope.restaurant}
  }

  geolocation.getLocation().then(function(data){
   $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};

   console.log($scope.coords)
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
