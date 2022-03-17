const routes = require('express').Router();

const userRoutes = require('./user/index');
const physicianRoutes = require('./physician/index');

routes.use('/user', userRoutes);
routes.use('/physician', physicianRoutes);


module.exports = routes;
