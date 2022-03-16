const routes = require("express").Router();


var UserController = require("../../controllers/user");
routes.post("/register", UserController.register);
module.exports = routes;