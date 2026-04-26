import { Heart, MessageCircle, Edit, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CommentCard = ({ comment, activeReply, setActiveReply }) => {
  const userId = localStorage.getItem("userId");

  // Basic States
  const [likesCount, setLikesCount] = useState(comment.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);

  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesCount, setRepliesCount] = useState(0);

  // 🔥 NEW STATES: Edit & Delete
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(comment.message);
  const [editMessage, setEditMessage] = useState(comment.message);

  // Determine if the logged-in user is the author of this comment
  const authorId = comment.author?._id
    ? String(comment.author._id)
    : String(comment.author);
  const isAuthor = userId === authorId;

  // Like checking logic
  const checkIsLiked = (likesArray, uid) => {
    if (!likesArray || !uid) return false;
    return likesArray.some((like) => {
      const likeId = like._id ? String(like._id) : String(like);
      return likeId === String(uid);
    });
  };

  useEffect(() => {
    if (comment.likes && userId) {
      setIsLiked(checkIsLiked(comment.likes, userId));
      setLikesCount(comment.likes.length);
    }
  }, [comment, userId]);

  // Fetch replies silently
  const fetchReplies = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/comments/${comment._id}/replies`,
      );
      setReplies(res.data);
      setRepliesCount(res.data.length);
    } catch {
      console.error("Failed to load replies");
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [comment._id]);

  const handleReplyClick = () => {
    if (showReplies) {
      setShowReplies(false);
      return;
    }
    setActiveReply({
      commentId: comment._id,
      username: comment.author?.username,
    });
    setShowReplies(true);
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "http://localhost:3000/api/updateLike",
        { commentId: comment._id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const updated = res.data.comment;
      setLikesCount(updated.likes.length);
      setIsLiked(checkIsLiked(updated.likes, userId));
    } catch {
      toast.error("Failed to update like ❌");
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return toast.error("Reply cannot be empty ❌");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/comments",
        { message: replyText, parentComment: comment._id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchReplies();
      setReplyText("");
      setActiveReply(null);
      setShowReplies(true);
      toast.success("Reply posted ✅");
    } catch {
      toast.error("Failed to post reply ❌");
    }
  };

  // 🔥 NEW HANDLER: Edit Submit
  const handleEditSubmit = async () => {
    if (!editMessage.trim()) return toast.error("Message cannot be empty ❌");

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "http://localhost:3000/api/updateComment",
        { commentId: comment._id, message: editMessage },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setCurrentMessage(editMessage); // Update UI instantly
      setIsEditing(false);
      toast.success("Comment updated ✅");
    } catch (error) {
      toast.error("Failed to update comment ❌");
    }
  };

  // 🔥 NEW HANDLER: Delete Comment
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?",
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      // Note: Axios DELETE requests send the body payload inside the `data` property
      await axios.delete("http://localhost:3000/api/deleteComment", {
        headers: { Authorization: `Bearer ${token}` },
        data: { commentId: comment._id },
      });

      setIsDeleted(true); // Hide the component instantly
      toast.success("Comment deleted 🗑️");
    } catch (error) {
      toast.error("Failed to delete comment ❌");
    }
  };

  // If deleted, don't render the card at all
  if (isDeleted) return null;

  return (
    <div className="group bg-white/5 border border-red-500/20 p-4 rounded-xl hover:shadow-lg hover:shadow-red-500/20 relative">
      {/* USER HEADER & ACTIONS */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={comment.author?.profilePicture || "https://i.pravatar.cc/40"}
            className="w-10 h-10 rounded-full"
            alt="Profile"
          />
          <span className="text-red-400 font-semibold">
            {comment.author?.username}
          </span>
        </div>

        {/* 🔥 NEW UI: Edit & Delete Buttons (Only visible to the author) */}
        {isAuthor && (
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-400 hover:text-blue-400 transition-colors"
              title="Edit Comment"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete Comment"
            >
              <Trash size={16} />
            </button>
          </div>
        )}
      </div>

      {/* 🔥 NEW UI: Toggle between normal text and edit input */}
      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            className="w-full bg-black/40 p-2 rounded text-white border border-blue-500/50 outline-none transition-all focus:ring-1 focus:ring-blue-500"
            rows="2"
          />
          <div className="flex gap-2 mt-2 text-sm">
            <button
              onClick={handleEditSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditMessage(currentMessage);
              }}
              className="border border-gray-600 hover:bg-white/5 text-gray-300 px-3 py-1 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-300 mb-4">{currentMessage}</p>
      )}

      {/* BOTTOM ACTIONS (Likes & Replies) */}
      <div className="flex gap-6 text-sm text-gray-400">
        <button
          onClick={handleLike}
          className="flex gap-2 items-center hover:text-red-400 transition-colors"
          style={{ color: isLiked ? "#ef4444" : "#9ca3af" }}
        >
          <Heart
            size={18}
            color={isLiked ? "#ef4444" : "currentColor"}
            fill={isLiked ? "#ef4444" : "none"}
          />
          <span className={isLiked ? "text-red-500" : "text-gray-400"}>
            {likesCount}
          </span>
        </button>

        <button
          onClick={handleReplyClick}
          className="flex gap-2 items-center hover:text-red-400 transition-colors"
        >
          <MessageCircle
            size={18}
            className={showReplies ? "text-red-400" : ""}
          />
          {repliesCount}
        </button>
      </div>

      {/* REPLY BOX */}
      <div
        className={`overflow-hidden transition-all duration-500 ${activeReply?.commentId === comment._id ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
      >
        <div className="p-4 bg-white/5 border border-red-500/20 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">
            Replying to{" "}
            <span className="text-red-400">@{activeReply?.username}</span>
          </p>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full bg-black/40 p-2 rounded text-white border border-transparent focus:border-red-500/50 outline-none transition-all"
            placeholder="Write a reply..."
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleReplySubmit}
              className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-1 rounded text-white"
            >
              Reply
            </button>
            <button
              onClick={() => {
                setActiveReply(null);
                setReplyText("");
              }}
              className="border border-red-500/50 hover:bg-red-500/10 transition-colors px-4 py-1 rounded text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* REPLIES (Recursive) */}
      {showReplies && replies.length > 0 && (
        <div className="ml-6 mt-4 border-l border-red-500/20 pl-4 space-y-3">
          {replies.map((reply) => (
            <CommentCard
              key={reply._id}
              comment={reply}
              activeReply={activeReply}
              setActiveReply={setActiveReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
