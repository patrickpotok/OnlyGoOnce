angular.module('onlyGoOnce')
.controller('AuthCtrl', function($scope, $location, $window, Auth) {
  window.localStorage.token = $location.search().token
  $location.search('token', null)
  Auth.getUser();
  $location.path('/loggedIn');
})
