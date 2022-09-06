
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name : String,
  email :  {
    type : String,
    unique: true
  },
  phone_number :  {
    type : String,
    unique: true
  },
  password : { type: String, bcrypt: true },
  address : String,
  role : Number,
  token : String
},
{ timestamps : true}
);
UserSchema.plugin(require('mongoose-bcrypt'));
module.exports =  mongoose.model("User", UserSchema);