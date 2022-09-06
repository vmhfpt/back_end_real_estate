const { models } = require("mongoose");
const path = require("path");
const cloudinary = require("cloudinary");
const Project = require("../Models/Project");
const ProjectValue = require("../Models/ProjectValue");
const uploadImage = require("../Config/cloudinary/cloudinary");
class ProjectController {
  index(req, res) {
   return  Project.find({})
   .populate("project_value_id", "-__v -project_id -createdAt -updatedAt")
     .then((data) => {
         return res.json(data);
     })
  }
  update(req, res) {
    return Project.findOneAndUpdate({slug : req.body.slug},{
        name: req.body.name,
        title: req.body.title,
        price_rent: req.body.price_rent,
        price_sale: req.body.price_sale_title,
        block_number: req.body.block_number,
        apartment_number: req.body.apartment_number,
        floor_number: req.body.floor_number,
        address: req.body.address,
        active: req.body.active,
        description: req.body.description,
        investor: req.body.investor_content,
        position: req.body.position_content,
        utility: req.body.utility_content,
        ground_floor: req.body.ground_floor,
        price: req.body.price,
        pay_method: req.body.pay_method,
        progress: req.body.progress,
        example_house: req.body.example_house,
        faq: req.body.faq,
    })
    .then((data) => {
       return ProjectValue.findOneAndUpdate({project_id : data._id}, {
            position : req.body.position,
            name_commerce : req.body.name_commerce,
            investor : req.body.investor,
            contractor_sum : req.body.contractor_sum,
            distribution_unit : req.body.distribution_unit,
            design : req.body.design,
            scale : req.body.scale,
            area_sum : req.body.area_sum,
            apartment_type : req.body.apartment_type,
            area_type : req.body.area_type,
            utility : req.body.utility,
            start_up : req.body.start_up,
            law : req.body.law,
            price_sale : req.body.price_sale,
            project_id : data._id,
        })
        .then((dataUpdate) => {
            if (req.files.file) {
                const dataFile = req.files.file;
                var string = data.thumb;
                var public_id = string.slice(string.indexOf("images"),string.lastIndexOf("."));
                dataFile.map((item) => {
                  const urlDb = async () => {
                    const dataNameCloud = await uploadImage(item.path, "image");
                   
                    return Promise.all([
                      Project.findByIdAndUpdate(data._id, {
                        thumb: dataNameCloud,
                      }),
                      cloudinary.v2.uploader.destroy(public_id)
                    ])
                  };
                  urlDb();
                });
              }
              return setTimeout( async function () {
                return await Project.findById(data._id)
                 .populate("project_value_id", "-__v -project_id -createdAt -updatedAt")
                 .then((result) => {
                     return res.json({status : 'success', result});
                 });
               }, 5000);

        });
    })
  }
  create(req, res) {
    Project.create({
      name: req.body.name,
      title: req.body.title,
      price_rent: req.body.price_rent,
      price_sale: req.body.price_sale_title,
      block_number: req.body.block_number,
      apartment_number: req.body.apartment_number,
      floor_number: req.body.floor_number,
      thumb: '',
      address: req.body.address,
      active: req.body.active,
      description: req.body.description,
      investor: req.body.investor_content,
      position: req.body.position_content,
      utility: req.body.utility_content,
      ground_floor: req.body.ground_floor,
      price: req.body.price,
      pay_method: req.body.pay_method,
      progress: req.body.progress,
      example_house: req.body.example_house,
      faq: req.body.faq,
    }).then((data) => {
      if (req.files.file) {
      
        const dataFile = req.files.file;
        dataFile.map((item) => {
       
          const urlDb = async () => {
            const dataNameCloud = await uploadImage(item.path, "image");
            return Project.findByIdAndUpdate(data._id, {
              thumb: dataNameCloud,
            });
          };
          urlDb();
        });
      }
      return ProjectValue.create({
        position : req.body.position,
        name_commerce : req.body.name_commerce,
        investor : req.body.investor,
        contractor_sum : req.body.contractor_sum,
        distribution_unit : req.body.distribution_unit,
        design : req.body.design,
        scale : req.body.scale,
        area_sum : req.body.area_sum,
        apartment_type : req.body.apartment_type,
        area_type : req.body.area_type,
        utility : req.body.utility,
        start_up : req.body.start_up,
        law : req.body.law,
        price_sale : req.body.price_sale,
        project_id : data._id,
      })
      .then((dataValue) => {
        return Project.findByIdAndUpdate(data._id, {
            project_value_id : dataValue._id,
          })
          .then((dataProject) => {
            return setTimeout( async function () {
                return await Project.findById(data._id)
                .populate("project_value_id", "-__v -project_id -createdAt -updatedAt")
                 .then((result) => {
                     return res.json({status : 'success', result});
                 });
               }, 5000);
          })
      })
    });
  }
  destroy(req, res) {
   return  Promise.all([
        Project.findById(req.body.id),
        ProjectValue.deleteOne({project_id : req.body.id})
     ])
     .then(([data, dataDelete]) => {
        let string = data.thumb;
        let public_id = string.slice(string.indexOf("images"),string.lastIndexOf("."));
     return Promise.all([
            Project.findByIdAndRemove(data._id),
            cloudinary.v2.uploader.destroy(public_id)
        ]).then(() => {
             return res.json({status : "success", id : data._id});
        })
     })
  }
}
module.exports = new ProjectController();
