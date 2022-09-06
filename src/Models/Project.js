const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  name : String,
  title : String,
  price_rent : String,
  price_sale : String,
  block_number : String,
  apartment_number : String,
  floor_number : String,
  thumb : String,
  address : String,
  active : Number,

  description : String,
  investor : String,
  position : String,
  utility : String,
  ground_floor : String,
  price : String,
  pay_method : String,
  progress : String,
  example_house : String,
  faq : String,
  slug : { type: String, slug: "title" },
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  project_value_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Project_value'},
  comment : [{ type: Schema.Types.ObjectId, ref: 'Comment', default: undefined }],
 
},
{ timestamps : true}
);
module.exports =  mongoose.model("Project",  ProjectSchema);