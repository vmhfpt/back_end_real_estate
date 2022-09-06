const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UtilitySchema = new Schema({
  name : {
    type : String,
    unique: true
  },
},
{ timestamps : true}
);
module.exports =  mongoose.model("Utility",  UtilitySchema);