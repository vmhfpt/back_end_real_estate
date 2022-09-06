
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const InformationSchema = new Schema({
  property_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  type_id : { type: Schema.Types.ObjectId, ref: 'Type', default: undefined },
  value_id : { type: Schema.Types.ObjectId, ref: 'Value', default: undefined },
},
{ timestamps : true}
);
module.exports =  mongoose.model("Information",  InformationSchema);