const path = require("path");
const cloudinary = require("cloudinary");
const slug = require("slug");
const Property = require("../Models/Property.js");
const InforProperty = require("../Models/InforProperty.js");
const Library = require("../Models/Library.js");
const uploadImage = require("../Config/cloudinary/cloudinary");
class PropertyController {
  index(req, res) {
    return Property.find({})
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
      .then((data) => {
        return res.json(data);
      })
      .catch((error) => {
        return res.json(error);
      });
  }
  update(req, res) {
    var dataType = req.body.type;
    if (dataType) {
      var arrayType = [];
      for (var i = 0; i < dataType.length; i++) {
        var convertObject = JSON.parse(dataType[i]);
        arrayType.push(convertObject);
      }
      req.body.type = arrayType;
    }
   
   
    Property.findOneAndUpdate({slug : req.body.slug},
      {
        active : Number(req.body.active),
        address : req.body.address,
        area : req.body.area,
        category_id : req.body.category,
        content : req.body.content,
        price : req.body.price,
        slug : slug(req.body.title),
        title : req.body.title,
        utility: req.body.utility,
      })
     .then((data) => {
      if(req.body.type){
        Promise.all([
             InforProperty.deleteMany({property_id : data._id}),
             Property.findByIdAndUpdate(data._id, {
                 information_id : []
             }).then(()=> {
              let arrayType = req.body.type;
              for (var i = 0; i < arrayType.length; i++) {
                InforProperty.create({
                  property_id: data._id,
                  type_id: arrayType[i].type_id,
                  value_id: arrayType[i].value_id,
                }).then((information) => {
                  return Property.findByIdAndUpdate(
                    data._id,
                    { $push: { information_id: information._id } },
                    { new: true, useFindAndModify: false }
                  );
                });
              }
             })
        ])
      }else {
        Promise.all([
          InforProperty.deleteMany({property_id : data._id}),
          Property.findByIdAndUpdate(data._id, {
              information_id : []
          })])
      }
       if(req.body.dataDeleteFiles){
      const dataDemo = req.body.dataDeleteFiles
           for(let i = 0; i < dataDemo.length; i ++){

            var string = dataDemo[i];
          var public_id = string.slice(string.indexOf("properties"),string.lastIndexOf("."));
            Promise.all([
              Library.findOneAndDelete({property_id : data._id, thumb : dataDemo[i]}),
              cloudinary.v2.uploader.destroy(public_id)
            ]).then(([deleteImages, DataCloudinary]) => {
              return Property.findByIdAndUpdate(data._id, {
                       $pull: { library : deleteImages._id },
                   });
            }).catch(([error1, error2]) => {
              console.log(error1, error2);
            })
           }
       }
       if (req.files.file) {
        const dataFile = req.files.file;
        var string = data.thumb;
        var public_id = string.slice(string.indexOf("images"),string.lastIndexOf("."));
        dataFile.map((item) => {
          var imagePath =
            path.join(__dirname, "\\..\\Public\\img\\properties\\") +
            item.filename;
          const urlDb = async () => {
            const dataNameCloud = await uploadImage(imagePath, "image");
           
            return Promise.all([
              Property.findByIdAndUpdate(data._id, {
                thumb: dataNameCloud,
              }),
              cloudinary.v2.uploader.destroy(public_id)
            ])
          };
          urlDb();
        });
      }
      if (req.files.images) {
        const dataFiles = req.files.images;

        dataFiles.map((item) => {
          var imagePath =
            path.join(__dirname, "\\..\\Public\\img\\properties\\") +
            item.filename;
          const urlDb = async () => {
            const dataNameCloud = await uploadImage(imagePath, "library");
            return Library.create({
              property_id: data._id,
              thumb: dataNameCloud,
            }).then((dataLibrary) => {
              return Property.findByIdAndUpdate(
                data._id,
                { $push: { library: dataLibrary._id } },
                { new: true, useFindAndModify: false }
              );
            });
          };
          urlDb();
        });
      }
      return setTimeout( async function () {
        return await Property.findById(data._id)
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
         .then((result) => {
             return res.json({status : 'success', result});
         });
       }, 5000);
        
     })
     .catch((error) => {
       return res.json(error);
     }) 
    // cloudinary.v2.uploader.destroy('images/1661489591839download')
  }
  create(req, res) {
    var dataType = req.body.type;
    if (dataType) {
      var arrayType = [];
      for (var i = 0; i < dataType.length; i++) {
        var convertObject = JSON.parse(dataType[i]);
        arrayType.push(convertObject);
      }
      req.body.type = arrayType;
    }
    return Property.create({
      title: req.body.title,
      price: req.body.price,
      content: req.body.content,
      address: req.body.address,
      area: req.body.area,
      active: Number(req.body.active),
      category_id: req.body.category,
      utility: req.body.utility,
      thumb: "",   
      user_id : req.userId

    })
      .then((data) => {
        if (req.body.type) {
          let arrayType = req.body.type;
          for (var i = 0; i < arrayType.length; i++) {
            InforProperty.create({
              property_id: data._id,
              type_id: arrayType[i].type_id,
              value_id: arrayType[i].value_id,
            }).then((information) => {
              return Property.findByIdAndUpdate(
                data._id,
                { $push: { information_id: information._id } },
                { new: true, useFindAndModify: false }
              );
            });
          }
        }
        if (req.files.file) {
          const dataFile = req.files.file;
          dataFile.map((item) => {
            var imagePath =
              path.join(__dirname, "\\..\\Public\\img\\properties\\") +
              item.filename;
            const urlDb = async () => {
              const dataNameCloud = await uploadImage(imagePath, "image");
              // console.log(dataNameCloud);
              return Property.findByIdAndUpdate(data._id, {
                thumb: dataNameCloud,
              });
            };
            urlDb();
          });
        }

        if (req.files.images) {
          const dataFiles = req.files.images;

          dataFiles.map((item) => {
            var imagePath =
              path.join(__dirname, "\\..\\Public\\img\\properties\\") +
              item.filename;
            const urlDb = async () => {
              const dataNameCloud = await uploadImage(imagePath, "library");
              return Library.create({
                property_id: data._id,
                thumb: dataNameCloud,
              }).then((dataLibrary) => {
                return Property.findByIdAndUpdate(
                  data._id,
                  { $push: { library: dataLibrary._id } },
                  { new: true, useFindAndModify: false }
                );
              });
            };
            urlDb();
          });
        }
        // 
       return setTimeout( async function () {
         return await Property.findById(data._id)
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
          .then((result) => {
              return res.json({status : 'success', result});
          });
        }, 5000);
       
      })
      .catch((error) => {
        return res.json(error);
      });
  }
  destroy(req, res) {
   return  Property.findById(req.body.id)
    .then((data) => {
      var string = data.thumb;
      var public_id = string.slice(string.indexOf("images"),string.lastIndexOf("."));
      return Promise.all([
         Library.find({property_id : data._id}),
         InforProperty.deleteMany({property_id : data._id}),
         cloudinary.v2.uploader.destroy(public_id),
         Property.deleteOne({_id : data._id})
       ])
       .then(([dataLibrary]) => {
          if(dataLibrary){
            dataLibrary.map((item) => {
              var string = item.thumb;
              var public_id = string.slice(string.indexOf("properties"),string.lastIndexOf("."));
               Promise.all([
                  cloudinary.v2.uploader.destroy(public_id),
                  Library.deleteOne(({property_id : data._id, thumb : item.thumb}))
               ]);
            })
          }
          return res.json({status : "success", id : req.body.id});
       });
       
    })
   
  }
}
module.exports = new PropertyController();
