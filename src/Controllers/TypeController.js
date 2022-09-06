const Type = require('../Models/Type');
class TypeController {
    index(req, res) {
       Type.find({})
       .populate('multiple_value',  '-type_id -createdAt -updatedAt')
       .sort({ createdAt: "desc", test: 1 })
       .then((data) => {
          return res.json(data);
       })
    }
    where(req, res) {
       Type.findById(req.query.id)
       .populate('multiple_value')
       .then((data) => {
          return res.json(data);
       })
    }
    create(req, res) {
       Type.create(req.body)
       .then((data) => {
         return res.json(data);
       })
    }
    update(req, res) {
        Type.findByIdAndUpdate(req.params.id, {
            name : req.body.name
        })
        .then((data) => {
            return res.json({status : 'Update thành công ', data});
        })
    }
    destroy(req, res){
        Type.findByIdAndRemove(req.body.id)
        .then((data) => {
            return res.json({status : "xóa thành công", data});
        })
    }
}
module.exports = new TypeController();