const routes = require('express').Router();

const userRoutes = require('./user/index');
const documentRoutes = require('./documents/index');


routes.use('/user', userRoutes);
routes.use('/document', documentRoutes);

module.exports = routes;
