const City = require("../Models/City");
const District = require("../Models/District");
const Ward = require("../Models/Ward");
class AddressController {
    getCity(req, res){
         City.find({})
         .then((data) => {
              return (res.json(data));
         })
         .catch((error) => {
            return res.json(error);
         })
         
    }
    getDistrict(req, res){
        District.find({ parent_code : req.query.city})
       .then((data) => {
         return res.json(data);
       })
       .catch((error) => {
          return res.json(error);
       })
    }
    getWard(req, res){
        Ward.find({ parent_code : req.query.district})
        .then((data) => {
          return res.json(data);
        })
        .catch((error) => {
           return res.json(error);
        })
    }
}
module.exports = new AddressController();