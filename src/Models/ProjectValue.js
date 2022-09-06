
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectValueSchema = new Schema({
  position : String,
  name_commerce : String,
  investor : String,
  contractor_sum : String,
  distribution_unit : String,
  design : String,
  scale : String,
  area_sum : String,
  apartment_type : String,
  area_type : String,
  utility : String,
  start_up : String,
  law : String,
  price_sale : String,
  project_id :  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

},
{ timestamps : true}
);
module.exports =  mongoose.model("Project_value",  ProjectValueSchema);