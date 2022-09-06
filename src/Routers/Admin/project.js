const express = require('express');
const Route = express.Router();
const handleUploadFile = require('../../Config/upload/multerConfig');
const ProjectController = require('../../Controllers/ProjectController');

Route.get('/list', ProjectController.index);
Route.post('/add',handleUploadFile, ProjectController.create);
Route.put('/update/:slug', handleUploadFile,ProjectController.update);
Route.delete('/delete', ProjectController.destroy);

module.exports = Route;