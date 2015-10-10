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

// .controller('SettingsCtrl', function($scope, $location) {
//   $location.path('/loggedIn');
// })

// .controller('RestaurantCtrl', function($scope) {

// })

// .controller('BrowseHereCtrl', function($scope) {

// })

// .controller('BrowseAnyCtrl', function($scope) {

// })

// Code for getting long and lat for ionic, not sure how to interpret this
.controller('GeoCtrl', function($cordovaGeolocation) {

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
    }, function(err) {
      // error
    });


  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
  });


  watch.clearWatch();
  // OR
  $cordovaGeolocation.clearWatch(watch)
    .then(function(result) {
      // success
      }, function (error) {
      // error
    });
});
