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


.controller('RestaurantCtrl', function($scope,geolocation) {
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
})




  /*
  $scope.setMap = function(map) {
    map.setCenter({
      lat:52.5159,
      lng:13.3777
    });
    map.setZoom(14);
  }

  //Step 1: initialize communication with the platform
  var platform = new H.service.Platform({
    app_id: 'evk3TrU4UcresAseG8Da',
    app_code: 'z4yYohROherMZ57eHTsQUg',
    useCIT: true,
    useHTTPS: true
  });
  var defaultLayers = platform.createDefaultLayers();

  //Step 2: initialize a map  - not specificing a location will give a whole world view.
  var map = new H.Map(document.getElementById('map'), defaultLayers.normal.map);

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Now use the map as required...
  $scope.setMap(map);


  */
  /*
  ApiService.getRestaurants(43.472285, -80.544858, 10)
  .success(function(response){
    console.log(response)
    var restaurant = response[1]
    var restaurantId = restaurant.external_id

    ApiService.pushHistory(restaurantId, true)
    .success(function(response){
      console.log(response)
    })

    ApiService.updateGoAgain(restaurantId)
    .success(function(response){
      console.log(response)
    })



  })

  ApiService.getAllRestaurants()
  .success(function(response){
    console.log(response)
  })

  console.log(ApiService.get_restaurants())
  */


// .controller('BrowseHereCtrl', function($scope) {

// })

.controller('ConfirmCtrl', function($scope, geolocation){
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
});
