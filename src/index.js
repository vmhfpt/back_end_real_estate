//const uploadFile = require ('express-fileupload') ;
const cloudinary = require('cloudinary').v2;
const http = require("http");
const cors = require('cors');
const router = require('./Routers/api');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./Config/database/database');
const app = express();
const port = 5000;
const server = http.createServer(app);
db.connect();
app.use(cors());
app.get('run-time-heroku/test', (req, res) => {
  res.send('<h1> hello heroku</h1>')
});
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
server.listen(process.env.PORT || 5000, () => {
  console.log(`server run  running at http://localhost:5000`);
});
