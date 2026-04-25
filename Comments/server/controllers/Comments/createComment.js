import Comment from "../../models/Comments.js";
import User from "../../models/User.js";

const createComment = async (req, res) => {
  try {
    const {
      authorId,
      message,
      parentCommentId,
      replyingToUserId,
      likedByUserId,
    } = req.body;

    if (!authorId || !message?.trim()) {
      return res
        .status(400)
        .json({ message: "Author and Message are required." });
    }

    const author = await User.findById(authorId);

    if (!author) {
      return res.status(404).json({ message: "Author Not Found!" });
    }

    if (parentCommentId) {
      const parent = await Comment.findById(parentCommentId);

      if (!parent) {
        return res.status(404).json({ message: "Parent Comment Not Found!" });
      }
    }
    if (replyingToUserId) {
      const replyUser = await User.findById(replyingToUserId);

      if (!replyUser) {
        return res.status(404).json({ message: "Replying User Not Found!" });
      }
    }

    let likedUser = [];
    if (likedByUserId) {
      const likes = await User.findById(likedByUserId);

      if (!likes) {
        return res.status(404).json({ message: "Liked By User Not Found!" });
      }

      likedUser.push(likedByUserId);
    }

    const newComment = await Comment.create({
      author: authorId,
      message,
      likes: likedUser,
      parentComment: parentCommentId || null,
      replyingTo: replyingToUserId || null,
    });

    res.status(201).json({
      message: "Comment created successful",
      newComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createComment;