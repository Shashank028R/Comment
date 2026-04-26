import Comment from "../../models/Comments.js";

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ parentComment: null })
      .sort({ createdAt: -1 })
      .populate("author", "username profilePicture");

    // add counts
    const updated = await Promise.all(
      comments.map(async (comment) => {
        const repliesCount = await Comment.countDocuments({
          parentComment: comment._id,
        });

        return {
          ...comment.toObject(),
          repliesCount,
          likesCount: comment.likes.length,
        };
      })
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllComments;