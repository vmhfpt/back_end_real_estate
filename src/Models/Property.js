const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const PropertySchema = new Schema({
  title : {
    type : String,
    unique: true
  },
  price : String,
  content : String,
  thumb : String,
  address : String,
  area : String,
  active : Number,
  information_id : [{ type: Schema.Types.ObjectId, ref: 'Information', default: undefined }],
  slug : { type: String, slug: "title" },
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category_id :  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  utility : [{ type: Schema.Types.ObjectId, ref: 'Utility', default: undefined }],
  library : [{ type: Schema.Types.ObjectId, ref: 'Library', default: undefined }],
},
{ timestamps : true}
);
module.exports =  mongoose.model("Property",  PropertySchema);