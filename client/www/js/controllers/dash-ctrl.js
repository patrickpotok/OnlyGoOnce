angular.module('onlyGoOnce')
.controller('DashCtrl', function($scope, $window, Auth, $location, EnvironmentConfig) {
  $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.token = window.localStorage.token;
  $scope.loginOauth = function(provider) {
    
    // Android Flow
    if (ionic.Platform.isAndroid()){
      var popupWindow =  cordova.InAppBrowser.open(EnvironmentConfig.api + '/auth/'+ provider, '_blank', 'location=no,toolbar=no');
      popupWindow.addEventListener('loadstart', function(event){
        var hasToken = event.url.indexOf('?token=');
        if (hasToken > -1){
          token = event.url.match('token=(.*)')[1];
          popupWindow.close();
          window.localStorage.token = token;
          Auth.getUser();
          $location.path('/loggedIn');
        }
      })
    }
    // Web Flow
    else{
      $window.location.href = EnvironmentConfig.api + '/auth/' + provider;
    }
  };
})