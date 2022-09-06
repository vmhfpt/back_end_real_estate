const slug = require("mongoose-slug-generator");
const mongoose = require("mongoose");
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const CommentSchema = new Schema(
  {
    name: String,
    email: String,
    content: String,
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", CommentSchema);
