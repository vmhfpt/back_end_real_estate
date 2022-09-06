const Property = require("../../Models/Property.js");
const Category = require("../../Models/Category.js");

const Project = require("../../Models/Project.js");
class PropertyController {
  getHome(req, res) {
    var dataItem = [];
    Promise.all([
      Property.find({})
        .select("-_id title price thumb address slug active area")
        .sort({ createdAt: "desc", test: 1 })
        .limit(12),
      Category.find({ parent_id: null, category_child: [] }).select("_id name"),
      Project.find({})
        .select(
          "-_id title name thumb address slug active title price_rent createdAt"
        )
        .sort({ createdAt: "desc", test: 1 })
        .limit(6),
    ]).then(([firstData, data, project]) => {
      data.map((item) => {
        Property.find({ category_id: item._id })
          .sort({ createdAt: "desc", test: 1 })
          .select("-_id title price thumb address slug active area")
          .limit(9)
          .then((result) => {
            dataItem.push({ category: item.name, arrayProperty: result });
          });
      });
      return setTimeout(function () {
        return res.json({
          data: dataItem,
          firstProperty: firstData,
          project: project,
        });
      }, 200);
    });
  }
  show(req, res) {
    Promise.all([
      Property.findOne({ slug: req.params.slug })
        .populate(
          "category_id",
          "-__v -parent_id -slug -category_child -createdAt -updatedAt -_id"
        )
        .populate("user_id")
        .populate("library", "-__v -_id -property_id -createdAt -updatedAt")
        .populate("utility", "-__v -createdAt -updatedAt -_id")
        .populate([
          {
            path: "information_id",
            populate: [
              {
                path: "type_id",
                model: "Type",
                select: "-_id name",
                options: { _recursed: true },
              },
              {
                path: "value_id",
                model: "Value",
                select: "-_id value",
                options: { _recursed: true },
              },
            ],

            select: "-_id -__v -property_id -createdAt -updatedAt",
          },
        ]),
      Property.find({})
        .limit(3)
        .populate(
          "category_id",
          "-__v -parent_id -slug -category_child -createdAt -updatedAt -_id"
        )
        .populate("library", "-__v -_id -property_id -createdAt -updatedAt")
        .populate("utility", "-__v -createdAt -updatedAt -_id")
        .populate([
          {
            path: "information_id",
            populate: [
              {
                path: "type_id",
                model: "Type",
                select: "-_id name",
                options: { _recursed: true },
              },
              {
                path: "value_id",
                model: "Value",
                select: "-_id value",
                options: { _recursed: true },
              },
            ],

            select: "-_id -__v -property_id -createdAt -updatedAt",
          },
        ]),
    ]).then(([data, lastNew]) => {
      var string = data.address;
      var search = string.slice(string.lastIndexOf(",") + 2, string.length);

      Property.find({ address: { $regex: ".*" + search + ".*" } })
        .select("-_id title price thumb address slug active area")
        .limit(6)
        .then((suggestions) => {
          return res.json({ data: data, suggest: suggestions, new: lastNew });
        });
    });
  }
  getByCategory(req, res) {
    var offsetPage = 1;
    var sortBy = "";
    if(req.query.sort) sortBy = String(req.query.sort);
    if (req.query.page && req.query.page > 0) {
      offsetPage = Number(req.query.page);
    }
    const itemLimit = 6;
    Category.findOne({slug : req.query.ca})
    .select("_id name")
    .then((data) => {
      //return res.json(data)
      Promise.all([
        Property.find({ category_id: data._id })
        .select("_id"),
        Property.find({ category_id: data._id})
          .select("-_id title price thumb address slug active area")
          .sort({ createdAt: sortBy, test: 1 })
          .skip((offsetPage - 1) * itemLimit)
          .limit(itemLimit),
          Property.find({ category_id: data._id})
          .select("-_id title price thumb address slug active area")
          .sort({ createdAt: "desc", test: 1 })
          .limit(4),
      ]).then(([dataTotal, dataDetail, suggest]) => {
        return res.json({
          category : data.name,
          paginate: {
            itemTotal: dataTotal.length,
            currentPage: offsetPage,
            itemLimit: itemLimit,
            sumPage: Math.ceil(dataTotal.length / itemLimit),
            next_page:
              Number(offsetPage) + 1 > Math.ceil(dataTotal.length / itemLimit)
                ? false
                : Number(offsetPage) + 1,
            prev_page: offsetPage - 1 > 0 ? Number(offsetPage) - 1 : false,
          },
          dataDetail,
          suggest : suggest,
        });
      });


    })
  }
  search(req, res){
    var offsetPage = 1;
    if(req.query.page && req.query.page > 0){
         offsetPage = Number(req.query.page);
    }
    var sortBy = "";
    if(req.query.sort) sortBy = String(req.query.sort);
    var itemLimit = 6;
     if(req.query.ca === ""){
     
       return Promise.all([
        Property.find({
          title :  { $regex: ".*" + req.query.key + ".*", $options: 'i' }
        })
        .select("_id"),
        Property.find({
          title :  { $regex: ".*" + req.query.key + ".*", $options: 'i' }
        })
        .sort({ createdAt: sortBy, test: 1 })
        .skip((offsetPage - 1) * itemLimit)
        .limit(itemLimit)
        .select("-_id title price thumb address slug active area")
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
          data,
      });
       })
     }
     return Category.findOne({name : req.query.ca})
     .then((data) => {
         return Promise.all([
            Property.find({
            category_id : data._id, 
             address: { $regex: ".*" + req.query.city + ".*" },
             title :  { $regex: ".*" + req.query.key + ".*", $options: 'i' }
           })
           .select("_id"),
           Property.find({
            category_id : data._id, 
             address: { $regex: ".*" + req.query.city + ".*" },
             title :  { $regex: ".*" + req.query.key + ".*", $options: 'i' }
           })
           .sort({ createdAt: sortBy, test: 1 })
           .skip((offsetPage - 1) * itemLimit)
           .limit(itemLimit)
           .select("-_id title price thumb address slug active area")
         ]).then(([dataTotal, data]) => {
          return res.json({
            paginate : {
               itemTotal : dataTotal.length,
               currentPage : offsetPage,
               itemLimit : itemLimit,
               sumPage : Math.ceil(dataTotal.length / itemLimit),
               next_page : Number(offsetPage) + 1 > Math.ceil(dataTotal.length / itemLimit) ? false : Number(offsetPage) + 1,
               prev_page : offsetPage - 1 > 0 ? Number(offsetPage) - 1 : false,
            },
            data,
        });
         })
     })
  }
  index(req, res){
    var offsetPage = 1;
    if (req.query.page && req.query.page > 0) {
      offsetPage = Number(req.query.page);
    }
    const itemLimit = 6;
    return Promise.all([
      Property.find({user_id : req.userId})
      .select("_id"),
      Property.find({user_id : req.userId})
    .populate(
      "category_id",
      "-__v -parent_id -slug -category_child -createdAt -updatedAt"
    )
    .populate("library", "-__v -_id -property_id -createdAt -updatedAt")
    .populate("utility", "-__v -createdAt -updatedAt")
    .populate([
      {
        path: "information_id",
        populate: [
          {
            path: "type_id",
            model: "Type",
            select: "_id name",
            options: { _recursed: true },
          },
          {
            path: "value_id",
            model: "Value",
            select: "_id value",
            options: { _recursed: true },
          },
        ],

        select: "-_id -__v -property_id -createdAt -updatedAt",
      },
    ])
    .sort({ createdAt: "desc", test: 1 })
    .skip((offsetPage - 1) * itemLimit)
    .limit(itemLimit),
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
        data,
    });
    })
    .catch((error) => {
      return res.json(error);
    });
   
  }



}
module.exports = new PropertyController();
