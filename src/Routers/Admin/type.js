const express = require('express');
const Route = express.Router();
const TypeController = require('../../Controllers/TypeController');
Route.get('/list', TypeController.index);
Route.get('/where', TypeController.where);
Route.post('/add', TypeController.create);
Route.put('/update/:id', TypeController.update);
Route.delete('/delete', TypeController.destroy);
module.exports = Route;

// 