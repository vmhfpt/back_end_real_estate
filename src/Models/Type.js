
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TypeSchema = new Schema({
  name : String,
  multiple_value : [{ type: Schema.Types.ObjectId, ref: 'Value', default: undefined }],
},
{ timestamps : true}
);
module.exports =  mongoose.model("Type",  TypeSchema);