const routes = require('express').Router();
const uploads = require('../../lib/multer');

var UserController = require('../../controllers/user');

routes.get('/getMembershipDetails/:email', UserController.getMembershipDetails);
routes.get(
  '/getMembershipConfirmation',
  UserController.getMembershipConfirmation
);
routes.post('/registerUser', UserController.registerUser); 

routes.post('/loginUser', UserController.loginUser)

routes.put("/updateUser/:id", uploads.single("profilePicture"),UserController.updateUser);

routes.get('/getAllUsers', UserController.getAllUsers);

routes.get('/getUser/:name', UserController.getUserByName);

module.exports = routes;
