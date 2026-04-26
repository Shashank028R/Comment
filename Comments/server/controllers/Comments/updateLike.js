import Comment from "../../models/Comments.js";
import User from "../../models/User.js";

const updateLike = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.user._id;

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required." });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment Not Found!" });
    }

    if (comment.likes.includes(userId)) {
      comment.likes.remove(userId);
      await comment.save();

      return res.status(200).json({
        message: "liked the comment.",
        comment,
      });
    }

    comment.likes.push(userId);

    await comment.save();

    res.json({
      message: "liked the comment.",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Sever Error: " + error.message });
  }
};

export default updateLike;
