const express = require('express');
const Route = express.Router();
const CommentController = require('../../Controllers/post/CommentController');
Route.post('/post', CommentController.create);


module.exports = Route;