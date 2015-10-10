'use strict';

var _ = require('lodash');
var History = require('./history.model');

// Get list of histories
exports.index = function(req, res) {
  History.find(function (err, histories) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(histories);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  History.create(req.body, function(err, history) {
    if(err) { return handleError(res, err); }
    console.log(history)
    return res.status(201).json(history);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}