// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'geolocation',
  'angular-here-maps'
])

.run(function($ionicPlatform, $rootScope, $location, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

  $rootScope.$on('$stateChangeStart', function (event, next) {
    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) { $location.path('/loggedIn'); }
      if (next.authenticate && !loggedIn) {
        event.preventDefault();
        $location.path('/');
      }
    });
  });

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider,MapConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('dash-out', {
    url: '/',
    templateUrl: 'templates/dash-out.html',
    controller: 'DashCtrl'
  })

  .state('dash-in', {
    url: '/loggedIn',
    templateUrl: 'templates/dash-in.html',
    controller: 'LoginCtrl'
  })

  .state('dash-settings', {
    url: '/settings',
    templateUrl: 'templates/dash-settings.html',
    //controller: 'SettingsCtrl'
  })

  .state('dash-restaurant-info', {
    url: '/restaurantInfo',
    templateUrl: 'templates/dash-restaurant-info.html',
    controller: 'RestaurantCtrl'
  })

  .state('dash-confirm', {
    url: '/eat',
    templateUrl: 'templates/dash-confirm.html',
    controller: 'ConfirmCtrl',
    params : { restaurant: null, },
  })

  .state('dash-browse-here', {
    url: '/browseHere',
    templateUrl: 'templates/dash-browse-here.html',
    //controller: 'BrowseHereCtrl'
  })

  .state('dash-browse-any', {
    url: '/browseAny',
    templateUrl: 'templates/dash-browse-any.html',
    controller: 'BrowseAnyCtrl'
  });

  MapConfigProvider.setOptions({
      appId: 'evk3TrU4UcresAseG8Da',
      appCode: 'z4yYohROherMZ57eHTsQUg',
      libraries: 'core,service,ui,mapevents',
      pixelRatio: 2, // Optional (Default: 1)
      pixelPerInch: 320 // Optional (Default: 72)
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  $httpProvider.interceptors.push('authInterceptor');

})

.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      console.log(response)
      if(response.status === 401) {
        $location.path('/');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    }
  };
})
