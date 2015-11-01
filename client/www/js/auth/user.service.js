'use strict';

angular.module('onlyGoOnce')
  .factory('User', function ($resource, EnvironmentConfig) {
    return $resource(EnvironmentConfig.api + '/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
