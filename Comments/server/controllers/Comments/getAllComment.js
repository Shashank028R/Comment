import Comment from "../../models/Comments.js";

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ parentComment: null })
      .sort({ createdAt: -1 })
      .populate("author", "username email profilePicture");

    for (let comment of comments) {
      const replies = await Comment.find({ parentComment: comment._id })
        .populate("author", "username profilePic")
        .populate("replyingTo", "username");

      comment._doc.replies = replies;
    }

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

export default getAllComments;