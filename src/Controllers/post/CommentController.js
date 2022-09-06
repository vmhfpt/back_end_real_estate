const Comment = require("../../Models/Comment.js");
const Project = require("../../Models/Project.js");
class CommentController {
  create(req, res) {
    return Comment.create(req.body).then((data) => {
      return Project.findByIdAndUpdate(
        data.project_id,
        { $push: { comment: data._id } },
        { new: true, useFindAndModify: false }
      ).then((dataComment) => {
        return res.json({ data });
      });
    });
  }
}
module.exports = new CommentController();
