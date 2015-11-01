angular.module('onlyGoOnce')
.controller('SettingsCtrl', function($scope, $location, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.isLoggedIn = Auth.isLoggedIn;

  $scope.logout = function(){
    Auth.logout()
  };
})
