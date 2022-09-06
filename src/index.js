//const uploadFile = require ('express-fileupload') ;
const cloudinary = require('cloudinary').v2;

const cors = require('cors');
const router = require('./Routers/api');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./Config/database/database');
const app = express();
const port = 5000;
db.connect();
app.use(cors());
//app.use(uploadFile());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router(app);

cloudinary.config({
  cloud_name: 'dqouzpjiz', 
  api_key: '621535751894482', 
  api_secret: 'yr8KAay4lBEf9TfS9RVSdRQ0fk0',
  secure: true
});

///////////////////////




////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 



/*

const cloudinary = require('cloudinary').v2;
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const router = require('./Routers/api');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./Config/database/database');
const app = express();




var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/Public/img/properties/');
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null,  Date.now() + file.originalname );
  }
})

var upload = multer({ storage: storage });
var multipleFile = upload.fields([{name : 'file', maxCount:1}, {name: 'images', maxCount:8}]);

const port = 5000;
db.connect();
app.use(cors());

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
cloudinary.config({
  cloud_name: 'dqouzpjiz', 
  api_key: '621535751894482', 
  api_secret: 'yr8KAay4lBEf9TfS9RVSdRQ0fk0',
  secure: true
});
const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder : 'properties',
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
      console.error(error);
  }
};
app.post('/admin/property/add',(req, res) => {
  //multipleFile 
  return res.json({'status ' : 'success'});
  const dataFiles = req.files.images;
  dataFiles.map(item => {
     
      var imagePath = path.join(__dirname, '\\..\\src\\Public\\img\\properties\\') + (item.filename);
      const urlDb = async () => {
        const dataNameCloud = await uploadImage(imagePath);
        console.log(dataNameCloud);
    }
     urlDb();
     
  });
   console.log("files :" , req.files.images);
  console.log("file: ",req.files.file);

  return res.json({status : "run here"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/