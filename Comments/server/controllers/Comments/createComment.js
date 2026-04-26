import Comment from "../../models/Comments.js";

const createComment = async (req, res) => {
  try {
    const {
      message,
      parentComment,
      replyingTo
    } = req.body;

    const userId = req.user._id;

    if (!message) {
      return res.status(400).json({ message: "Message required" });
    }

    // ✅ create comment properly
    const newComment = await Comment.create({
      author: userId,
      message,
      parentComment: parentComment || null,
      replyingTo: replyingTo || null,
      likes: []
    });

    // ✅ populate before sending back
    const populatedComment = await Comment.findById(newComment._id)
      .populate("author", "username profilePicture")
      .populate("replyingTo", "username");

    res.status(201).json(populatedComment);

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error: " + error.message
    });
  }
};

export default createComment;