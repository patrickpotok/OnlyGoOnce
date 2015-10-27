'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/feastbackend-dev'
  },

  client_uri: 'http://localhost:8100',

  seedDB: true
};
