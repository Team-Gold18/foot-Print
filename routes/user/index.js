const routes = require('express').Router();

var UserController = require('../../controllers/user');
routes.get('/getMembershipDetails/:email', UserController.getMembershipDetails);
routes.get(
  '/getMembershipConfirmation',
  UserController.getMembershipConfirmation
);
routes.post('/registerUser', UserController.registerUser);

module.exports = routes;
