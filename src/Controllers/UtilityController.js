const Utility = require('../Models/Utility');
class UtilityController {
    getAll(req, res){
        Utility.find({})
        .then((data) => {
            return res.json(data);
        })
        .catch((error) => {
            return res.json(error);
        });
    }
    index(req, res) {
     
        if(req.query.page && req.query.page > 0){
           var offsetPage = Number(req.query.page);
        }else {
            var offsetPage = 1;
        }
        const itemLimit = 5;
        Promise.all([
            Utility.find({}),
            Utility.find({})
            .sort({ createdAt: "desc", test: 1 })
            .skip((offsetPage - 1) * itemLimit)
            .limit(itemLimit)
        ])
        .then(([dataTotal, data]) => {
            return res.json({
                paginate : {
                   itemTotal : dataTotal.length,
                   currentPage : offsetPage,
                   itemLimit : itemLimit,
                   sumPage : Math.ceil(dataTotal.length / itemLimit),
                   next_page : Number(offsetPage) + 1 > Math.ceil(dataTotal.length / itemLimit) ? false : Number(offsetPage) + 1,
                   prev_page : offsetPage - 1 > 0 ? Number(offsetPage) - 1 : false,
                },
                data
            });
        })
    }
    create(req, res) {
        Utility.create(req.body)
        .then((data) => {
           // 
           Utility.find({})
            .sort({ createdAt: "desc", test: 1 })
            .skip(0)
            .limit(5)
            .then((dataItem) => {
                return res.json({status : 'success', message : `Thêm tiện ích ${data.name} thành công` , data: dataItem});
            })
        })
        .catch((error) => {
            return res.json({status : 'error', message : '* Tên đã tồn tại'});
        })
    }
    update(req, res) {
        Utility.findByIdAndUpdate(req.params.id, {
            name : req.body.name
        })
        .then((data) => {
            return res.json({status : 'Update thành công ', name : req.body.name});
        })
    }
    destroy(req, res){
        Utility.findByIdAndRemove(req.body.id)
        .then((data) => {
            return res.json({status : "xóa thành công", data});
        })
           
    }
    show(req, res) {
        //req.params.id
     /*   Utility.findOne({_id : req.params.id})
        .then((data) => {
            return ()
        })*/
    }
}
module.exports = new UtilityController();