const express = require('express');
const Route = express.Router();
const handleUploadFile = require('../../Config/upload/multerConfig');
const PropertyController = require('../../Controllers/PropertyController');
Route.get('/list', PropertyController.index);
Route.post('/add',handleUploadFile, PropertyController.create);
Route.put('/update/:slug',handleUploadFile, PropertyController.update);
Route.delete('/delete', PropertyController.destroy);
module.exports = Route;