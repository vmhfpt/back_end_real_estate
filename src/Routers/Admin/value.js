const express = require('express');
const Route = express.Router();
const ValueController = require('../../Controllers/ValueController');
Route.get('/list/:id', ValueController.index);
Route.post('/add', ValueController.create);
Route.put('/update/:id', ValueController.update);
Route.delete('/delete', ValueController.destroy);
module.exports = Route;