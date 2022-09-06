
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ValueSchema = new Schema({
  type_id :  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    default: null
  },
  value : String, 
},
{ timestamps : true}
);
module.exports =  mongoose.model("Value",  ValueSchema);