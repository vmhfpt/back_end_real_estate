const express = require('express');
const Route = express.Router();
const ProjectController = require('../../Controllers/post/ProjectController');
Route.get('/:slug', ProjectController.show);
Route.get('/', ProjectController.index);
module.exports = Route;