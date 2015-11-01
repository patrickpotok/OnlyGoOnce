'use strict';

angular.module('onlyGoOnce')
  .factory('User', function ($resource, EnvironmentConfig) {
    return $resource(EnvironmentConfig.api + '/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
