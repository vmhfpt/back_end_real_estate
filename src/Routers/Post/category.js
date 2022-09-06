const express = require('express');
const Route = express.Router();
const CategoryController = require('../../Controllers/post/CategoryController');
Route.get('/get', CategoryController.index);
Route.get('/get-city', CategoryController.getCity);

module.exports = Route;