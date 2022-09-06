const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name : {
    type : String,
    unique: true
  },
  slug : { type: String, slug: "name" },
  parent_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  },
  category_child : [{ type: Schema.Types.ObjectId, ref: 'Category', default: undefined }],
},
{ timestamps : true}
);
module.exports =  mongoose.model("Category",  CategorySchema);