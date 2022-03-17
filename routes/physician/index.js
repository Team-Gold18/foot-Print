const routes = require('express').Router();

var PhysicianController = require('../../controllers/physician');

routes.post("/create", PhysicianController.create);
routes.put("/update/:id", PhysicianController.update);
routes.delete("/delete/:id", PhysicianController.delete);
routes.get('/getAllPhysician', PhysicianController.getAllPhysician);
routes.get('/getPhysician/:id', PhysicianController.getPhysicianById);

module.exports = routes;