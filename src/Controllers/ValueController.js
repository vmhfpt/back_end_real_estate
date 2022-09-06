const Value = require('../Models/Value');
const Type = require('../Models/Type');
class ValueController {
    index(req, res) {
       Value.findById(req.params.id)
       .populate('type_id')
       .then((data) => {
              return res.json(data);
       })
    }
    create(req, res) {
       Value.create(req.body)
       .then((data) => {
        Type.findByIdAndUpdate(
            data.type_id,
            { $push: { multiple_value: data._id } },
            { new: true, useFindAndModify: false }
          )
          .then((dataItem) => {
               return res.json({status : 'Add success', data : data});
          })
       })
    }
    update(req, res) {
        Value.findById(req.params.id)
        .then((data) => {
            if (!data) return res.json({ status: "Not Found Item" });
            if (!req.body.type_id) req.body.type_id = null;
            Promise.all([
                Type.findByIdAndUpdate(data.type_id, {
                    $pull: { multiple_value : data._id },
                }),
                Value.findByIdAndUpdate(req.params.id, req.body),
                Type.findByIdAndUpdate(req.body.type_id, {
                    $push: { multiple_value : data._id },
                })
            ])
            .then(([dataPull, dataUpdate, dataPush]) => {
                return res.json({dataPull, dataUpdate, dataPush, data});
            })
        })
    }
    destroy(req, res){
       Value.findById(req.body.id)
       .then((data) => {
           Promise.all([
                Type.findByIdAndUpdate(data.type_id, {
                    $pull: { multiple_value : data._id },
                }),
                Value.findByIdAndRemove(req.body.id)
           ])
           .then(([dataUpdate, dataDelete]) => {
               return res.json({dataUpdate, dataDelete});
           })
       })
    }
}
module.exports = new ValueController();