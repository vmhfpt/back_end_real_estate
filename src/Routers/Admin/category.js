const express = require('express');
const Route = express.Router();
const CategoryController = require('../../Controllers/CategoryController');
Route.get('/list', CategoryController.index);
Route.post('/add', CategoryController.create);
Route.put('/update/:slug', CategoryController.update);
Route.delete('/delete', CategoryController.destroy);
Route.get('/show/:slug',  CategoryController.show)
module.exports = Route;