const Category = require("../../Models/Category");
const Property = require("../../Models/Property.js");
const City = require("../../Models/City.js");
class CategoryController {
    index(req, res){
     return   Promise.all([
        Category.find({parent_id : null})
        .populate('category_child', '-_id -parent_id -category_child -__v -createdAt -updatedAt'),
        Category.find({})
        .populate('category_child', '-_id -parent_id -category_child -__v -createdAt -updatedAt'),
        ])
        .then(([data, multipleData]) => {
            return res.json({category : data, categories : multipleData});
        })
    }
    getCity(req, res){
        City.find({})
        .then((data) => {
            return res.json(data);
        })
    }
   
}
module.exports = new CategoryController();