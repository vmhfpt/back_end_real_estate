
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const LibrarySchema = new Schema({
  thumb : String,
  property_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
},
{ timestamps : true}
);
module.exports =  mongoose.model("Library",  LibrarySchema);