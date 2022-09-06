const Project = require("../../Models/Project.js");
const Property = require("../../Models/Property.js");
class ProjectController {
  index(req, res){
   
    var offsetPage = 1;
    if(req.query.page && req.query.page > 0){
         offsetPage = Number(req.query.page);
    }
    const itemLimit = 6;
    Promise.all([
        Project.find({})
        .select("_id"),
        Project.find({})
        .select(
            "-_id title name thumb address slug active title price_rent createdAt"
          )
        .sort({ createdAt: "desc", test: 1 })
        .skip((offsetPage - 1) * itemLimit)
        .limit(itemLimit),
        Property.find({})
        .select("-_id title price thumb address slug active area")
        .sort({ createdAt: "desc", test: 1 })
        .limit(4),
    ])
    .then(([dataTotal, data, suggest]) => {
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
            suggest
        });
    })

  }
  show(req, res){
    Promise.all([
        Project.findOne({slug : req.params.slug})
        .populate("project_value_id", "-_id -__v -project_id -createdAt -updatedAt")
        .populate("comment", "-_id -__v "),
        Project.find({})
        .select(
            "-_id title name thumb address slug active title price_rent createdAt"
          )
        .sort({ createdAt: "desc", test: 1 })
        .limit(4)
    ])
    .then(([data, suggest]) => {
        return res.json({data, suggest});
    })
   
  }
}
module.exports = new ProjectController();