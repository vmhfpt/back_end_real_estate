const express = require('express');
const Route = express.Router();
const AddressController = require('../../Controllers/AddressController');
Route.get('/city/list', AddressController.getCity);
Route.get('/district', AddressController.getDistrict);
Route.get('/ward', AddressController.getWard);

module.exports = Route;