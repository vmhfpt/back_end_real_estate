const express = require('express');
const Route = express.Router();
const UserController = require('../../Controllers/UserController');
Route.get('/list', UserController.index);
Route.post('/add', UserController.create);
Route.put('/update', UserController.update);
Route.delete('/delete', UserController.destroy);
module.exports = Route;