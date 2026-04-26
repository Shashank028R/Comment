import Comment from "../../models/Comments.js";

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.user._id;

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID are required." });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment Not Found!" });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Forbidden Request." });
    }

    await Comment.deleteOne({ _id: commentId });
    await Comment.deleteMany({ parentComment: commentId });

    res.json({
      message: "Comment Deleted Successful"
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

export default deleteComment;
