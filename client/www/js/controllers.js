angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window, Auth) {
  $scope.isLoggedIn = Auth.isLoggedIn;

  $scope.loginOauth = function(provider) {
    // Window open for Mobile
    //  window.open('http://localhost:9000/auth/' + provider, '_system', 'location=yes');
    $window.location.href = 'http://localhost:9000/auth/' + provider;
  };
})

.controller('LoginCtrl', function($scope, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.isLoggedIn = Auth.isLoggedIn;

  $scope.logout = function(){
    Auth.logout()
  };
})

.controller('SettingsCtrl', function($scope, $location, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.isLoggedIn = Auth.isLoggedIn;

  $scope.logout = function(){
    Auth.logout()
  };
})


.controller('RestaurantCtrl', function($scope,geolocation, ApiService, $window) {
  //ApiService.invalidateAll()
  $scope.back = function(){
    $window.history.back();
  }
  
  $scope.coords = {}
  $scope.restaurant = {}

  $scope.markers = {locations: []}

  $scope.getParamsForState = function(){
    return {'restaurant' : $scope.restaurant}
  }

  geolocation.getLocation().then(function(data){
   $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};

   console.log($scope.coords)
    ApiService.getRestaurants(data.coords.latitude, data.coords.longitude, 1)
    .success(function(response){
      $scope.restaurant = response[0]

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

.controller('BrowseHereCtrl', function($scope, geolocation, ApiService) {
  
  $scope.restaurants = []
  
  $scope.remove_br = function(address){
    return address.replace("<br/>", ", ")
  }
  
  geolocation.getLocation().then(function(data){
   $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    ApiService.getRestaurants(data.coords.latitude, data.coords.longitude, 5)
    .success(function(response){
      console.log(response)
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
    console.log($window.history)
    $window.history.back();
  }
  
  console.log($stateParams)
  
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

.controller('BrowseAnyCtrl', function($scope, geolocation) {
  $scope.coords = {}

  geolocation.getLocation().then(function(data){
   $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
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

   $scope.ryanbullshit = function($event) {
    debugger;
   }
});
