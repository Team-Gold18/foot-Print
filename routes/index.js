const routes = require('express').Router();


const userRoutes = require('./user/index');
const prescriptionMedication = require('./prescriptionMedication/index');


routes.use('/user', userRoutes);
routes.use('/prescriptionMedication', prescriptionMedication);
module.exports = routes;
