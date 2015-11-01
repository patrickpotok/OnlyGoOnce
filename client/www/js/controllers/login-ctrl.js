angular.module('starter')
.controller('LoginCtrl', function($scope, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.isLoggedIn = Auth.isLoggedIn;
})
