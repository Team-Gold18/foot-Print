const routes = require('express').Router();


const userRoutes = require('./user/index');
routes.use('/user', userRoutes);
module.exports = routes;
