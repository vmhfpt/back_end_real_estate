const express = require('express');
const Route = express.Router();
const PropertyController = require('../../Controllers/post/PropertyController');
const PropertyAdminController = require("../../Controllers/PropertyController.js");
const handleUploadFile = require('../../Config/upload/multerConfig');

Route.get('/list', PropertyController.index);
Route.post('/add', handleUploadFile, PropertyAdminController.create );
Route.put('/update/:slug', handleUploadFile, PropertyAdminController.update );
Route.delete('/delete',  PropertyAdminController.destroy );

module.exports = Route;