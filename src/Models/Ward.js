
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const WardSchema = new Schema({
 name : String,
 type : String,
 name_with_type : String,
 path_with_type : String,
 slug : String,
 code : String,
 parent_code : String
},
{ timestamps : true}
);
module.exports =  mongoose.model("Ward",  WardSchema);