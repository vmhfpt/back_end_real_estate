const express = require('express');
const Route = express.Router();
const PropertyController = require('../../Controllers/post/PropertyController');



Route.get('/search', PropertyController.search);
Route.get('/get-home', PropertyController.getHome);

Route.get('/:slug', PropertyController.show);
Route.get('/', PropertyController.getByCategory);


module.exports = Route;