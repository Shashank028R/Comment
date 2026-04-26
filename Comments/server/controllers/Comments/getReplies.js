import Comment from "../../models/Comments.js";

const getReplies = async (req, res) => {
  try {
    const { commentId } = req.params;

    const replies = await Comment.find({ parentComment: commentId })
      .sort({ createdAt: 1 })
      .populate("author", "username profilePicture")
      .populate("replyingTo", "username");

    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getReplies;