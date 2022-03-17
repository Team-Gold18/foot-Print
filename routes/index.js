const routes = require('express').Router();
const prescriptionMedication = require('./prescriptionMedication/index');
const physicianRoutes = require('./physician/index');
const userRoutes = require('./user/index');
const documentRoutes = require('./documents/index');

routes.use('/document', documentRoutes);
routes.use('/user', userRoutes);
routes.use('/prescriptionMedication', prescriptionMedication);
routes.use('/physician', physicianRoutes);


module.exports = routes;
