angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window, Auth) {
  $scope.objects = {}
  $scope.user = Auth.getCurrentUser()

  $scope.isLoggedIn = Auth.isLoggedIn;


  $scope.test = function(){
    console.log("Test")
  };

  $scope.logout = function(){
    console.log($scope.user);
    Auth.logout()
  };

  $scope.loginOauth = function(provider) {
    // Window open for Mobile
    //  window.open('http://localhost:9000/auth/' + provider, '_system', 'location=yes');
    $window.location.href = 'http://localhost:9000/auth/' + provider;
    $location.path('/loggedIn');
  };
})

// .controller('LoginCtrl', function($scope) {

// })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
