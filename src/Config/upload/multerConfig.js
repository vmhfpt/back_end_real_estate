const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/Public/img/properties/');
    },
    filename: function (req, file, cb) {
      
      cb(null,  Date.now() + (Math.random() + 1).toString(36).substring(7) );
    }
  });

  var upload = multer({ storage: storage });
   const handleUploadFile = upload.fields([{name : 'file', maxCount:1}, {name: 'images', maxCount:12}]);
   module.exports = handleUploadFile;