const Category = require("../Models/Category");
const slug = require("slug");
class CategoryController {
  update(req, res) {
   
    //http://localhost:3000/admin/category/update/slug method PUT request data body
    Category.findOne({ slug: req.params.slug }).then((data) => {
      if (!data) return res.json({ status: "Not Found Item" });
      if (!req.body.params.parent_id || req.body.params.parent_id == "0") req.body.params.parent_id = null;
   
      Promise.all([
        Category.findByIdAndUpdate(data.parent_id, {
          $pull: { category_child: data._id },
        }),
        Category.findOneAndUpdate(
          { slug: req.params.slug },
          {
            name: req.body.params.name,
            slug: slug(req.body.params.name),
            parent_id: req.body.params.parent_id,
          }
        ),
        req.body.params.parent_id
          ? Category.findByIdAndUpdate(
              req.body.params.parent_id,
              { $push: { category_child: data._id } },
              { new: true, useFindAndModify: false }
            )
          : null,
      ]).then(([dataItem, dataItem2, dataItem3]) => {
        return res.json({ dataItem, dataItem2, dataItem3 });
      });
    });
  }
  index(req, res) {
    //return res.json({state : "success"});
    //http://localhost:3000/admin/category/list Method GET
     Category.find({})
     .populate('parent_id', '-_id -parent_id -category_child -createdAt -updatedAt')
     .then((data) => {
         return res.json(data);
     })
  }
  destroy(req, res) {
    
    //http://localhost:3000/admin/category/delete Method DELETE request data body
    Promise.all([
      Category.findById(req.body.id),
      Category.findByIdAndRemove(req.body.id),
    ]).then(([data, dataDelete]) => {
      return Category.findByIdAndUpdate(data.parent_id, {
        $pull: { category_child: data._id },
      }).then((dataUpdate) => {
           return res.json({status : "success",data, dataDelete, dataUpdate});
      });
    });
  }
  create(req, res) {
    if(req.body.params.parent_id == "0") req.body.params.parent_id = null;
    //http://localhost:3000/admin/category/add method POST request data body
    Category.create(req.body.params).then((data) => {
      Category.findByIdAndUpdate(
        data.parent_id,
        { $push: { category_child: data._id } },
        { new: true, useFindAndModify: false }
      ).then((dataItem) => {
        return res.json({status : 'success', data});
      });
    });
  }
  show(req, res){
   return Promise.all([
      Category.findOne({ slug: req.params.slug }),
      Category.find({})
    ])
    .then(([dataItem, list]) => {
       if(dataItem){
           return res.json({dataItem, list});
       }else {
          return res.json({status : 'not found item'});
       }
        
    })
  }
}
module.exports = new CategoryController();
