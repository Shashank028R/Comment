import { Heart, MessageCircle, Edit, Trash, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CommentCard = ({ comment, activeReply, setActiveReply }) => {
  const userId = localStorage.getItem("userId");

  const [likesCount, setLikesCount] = useState(comment.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesCount, setRepliesCount] = useState(0);

  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // 🔥 NEW STATE: Controls the Delete Modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [currentMessage, setCurrentMessage] = useState(comment.message);
  const [editMessage, setEditMessage] = useState(comment.message);

  const authorId = comment.author?._id ? String(comment.author._id) : String(comment.author);
  const isAuthor = String(userId) === String(authorId);

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

  const fetchReplies = async () => {
    try {
      const res = await axios.get(
        `https://comments-backend-934h.onrender.com/api/comments/${comment._id}/replies`
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
        "https://comments-backend-934h.onrender.com/api/updateLike",
        { commentId: comment._id },
        { headers: { Authorization: `Bearer ${token}` } }
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
        "https://comments-backend-934h.onrender.com/api/comments",
        { message: replyText, parentComment: comment._id },
        { headers: { Authorization: `Bearer ${token}` } }
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

  const handleEditSubmit = async () => {
    if (!editMessage.trim()) return toast.error("Message cannot be empty ❌");
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "https://comments-backend-934h.onrender.com/api/updateComment",
        { commentId: comment._id, message: editMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentMessage(editMessage);
      setIsEditing(false);
      toast.success("Comment updated ✅");
    } catch (error) {
      toast.error("Failed to update comment ❌");
    }
  };

  // 🔥 UPDATED: This now does the actual deleting, called by the Modal
  const executeDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://comments-backend-934h.onrender.com/api/deleteComment", {
        headers: { Authorization: `Bearer ${token}` },
        data: { commentId: comment._id } 
      });

      setIsDeleted(true);
      toast.success("Comment deleted 🗑️");
    } catch (error) {
      toast.error("Failed to delete comment ❌");
    } finally {
      setShowDeleteModal(false); // Close the modal whether it succeeds or fails
    }
  };

  if (isDeleted) return null;

  return (
    <>
      {/* 🔥 CUSTOM DELETE MODAL OVERLAY */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowDeleteModal(false)} // Clicking the blurry background closes it!
        >
          {/* Modal Box */}
          <div 
            className="bg-[#0a0a0a] border border-red-500/20 w-full max-w-sm rounded-2xl p-6 shadow-2xl shadow-red-500/10 transform transition-all scale-100 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} // Prevents clicking inside the box from closing it!
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Comment?</h3>
              <p className="text-gray-400 text-sm mb-6">
                This action cannot be undone. Are you sure you want to permanently remove this?
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-300 font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 shadow-lg shadow-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Comment Card */}
      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:shadow-lg hover:shadow-red-500/5 transition-all relative">
        
        {/* USER HEADER & ACTIONS */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={comment.author?.profilePicture || "https://i.pravatar.cc/40"}
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
            <span className="text-red-400 font-semibold drop-shadow-sm">
              {comment.author?.username}
            </span>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className="text-gray-500 hover:text-blue-400 transition-colors"
                title="Edit Comment"
              >
                <Edit size={16} />
              </button>
              {/* 🔥 UPDATED: Clicking trash now opens the modal instead of window.confirm */}
              <button 
                onClick={() => setShowDeleteModal(true)} 
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Delete Comment"
              >
                <Trash size={16} />
              </button>
            </div>
          )}
        </div>

        {/* EDIT TOGGLE */}
        {isEditing ? (
          <div className="mb-4">
            <textarea
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              className="w-full bg-black/40 p-3 rounded-xl text-white border border-blue-500/30 outline-none transition-all focus:ring-1 focus:ring-blue-500"
              rows="2"
            />
            <div className="flex gap-2 mt-2 text-sm">
              <button onClick={handleEditSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                Save
              </button>
              <button onClick={() => { setIsEditing(false); setEditMessage(currentMessage); }} className="border border-white/10 hover:bg-white/5 text-gray-300 px-4 py-1.5 rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-300 mb-4 font-light">{currentMessage}</p>
        )}

        {/* BOTTOM ACTIONS */}
        <div className="flex gap-6 text-sm text-gray-400">
          <button
            onClick={handleLike}
            className={`flex gap-2 items-center hover:text-red-400 transition-colors ${
              isLiked ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Heart 
              size={18} 
              className={isLiked ? "fill-red-500 text-red-500" : ""} 
            />
            <span>{likesCount}</span>
          </button>

          <button onClick={handleReplyClick} className="flex gap-2 items-center hover:text-red-400 transition-colors">
            <MessageCircle size={18} className={showReplies ? "text-red-400" : "text-gray-500"} />
            {repliesCount}
          </button>
        </div>

        {/* REPLY BOX */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeReply?.commentId === comment._id ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
          <div className="p-4 bg-black/20 border border-white/5 rounded-xl">
            <p className="text-xs text-gray-400 mb-3">
              Replying to <span className="text-red-400 font-medium">@{activeReply?.username}</span>
            </p>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full bg-white/[0.03] p-3 rounded-lg text-white border border-white/5 focus:border-red-500/50 outline-none transition-all"
              placeholder="Write a reply..."
              rows="2"
            />
            <div className="flex gap-3 mt-3">
              <button onClick={handleReplySubmit} className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-colors px-5 py-1.5 rounded-lg text-white font-medium shadow-lg shadow-red-500/20">Reply</button>
              <button onClick={() => { setActiveReply(null); setReplyText(""); }} className="border border-white/10 hover:bg-white/5 transition-colors px-5 py-1.5 rounded-lg text-gray-300">Cancel</button>
            </div>
          </div>
        </div>

        {/* REPLIES */}
        {showReplies && replies.length > 0 && (
          <div className="ml-4 mt-4 border-l-2 border-white/5 pl-4 space-y-4">
            {replies.map((reply) => (
              <CommentCard key={reply._id} comment={reply} activeReply={activeReply} setActiveReply={setActiveReply} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentCard;