import Comment from "../../models/Comments.js";
import User from "../../models/User.js";

const updateComment = async (req, res) => {
  try {
    const { commentId, message } = req.body;
    const userId = req.user._id;

    if (!commentId || !message?.trim()) {
      return res.status(400).json({ message: "Provide ID and Message!" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment Not Found!" });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Forbidden Request." });
    }

    comment.message = message;

    await comment.save();

    res.json({
      message: "Update Successful",
      comment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error: " + error.message });
  }
};

export default updateComment;
