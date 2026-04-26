import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CommentCard = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);

  // 🔥 fetch replies
  const handleReplies = async () => {
    if (!showReplies) {
      const res = await axios.get(
        `http://localhost:3000/api/comments/${comment._id}/replies`
      );
      setReplies(res.data);
    }
    setShowReplies(!showReplies);
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      return toast.error("Reply cannot be empty ❌");
    }

    toast.success("Reply posted 🚀");

    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="group bg-white/5 border border-red-500/20 p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">

      {/* 🔝 User */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={comment.author?.profilePicture || "https://i.pravatar.cc/40"}
          className="w-10 h-10 rounded-full border border-red-500/30"
        />
        <span className="text-sm font-semibold text-red-400">
          {comment.author?.username || "Anonymous"}
        </span>
      </div>

      {/* 💬 Message */}
      <p className="text-gray-300 mb-4">{comment.message}</p>

      {/* 🔻 Actions */}
      <div className="flex items-center gap-6 text-sm text-gray-400 mb-2">

        {/* ❤️ Like */}
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-2 hover:text-red-400 transition"
        >
          <Heart
            size={18}
            className={`transition-all duration-300 ${
              liked
                ? "fill-red-500 text-red-500 scale-110 drop-shadow-[0_0_6px_red]"
                : ""
            }`}
          />
          {comment.likesCount || 0}
        </button>

        {/* 💬 Toggle Replies */}
        <button onClick={handleReplies}>
          {comment.repliesCount || 0} Replies
        </button>

        {/* 💬 Reply */}
        <button
          onClick={() => {
            setShowReply(true);
            setActiveReplyId(null);
          }}
          className="flex items-center gap-2 hover:text-red-400 transition"
        >
          <MessageCircle size={18} />
          Reply
        </button>
      </div>

      {/* 🔥 Parent Reply Box */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          showReply ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 rounded-lg bg-white/5 border border-red-500/20">
          <p className="text-xs text-gray-400 mb-2">
            Replying to{" "}
            <span className="text-red-400">
              @{comment.author?.username}
            </span>
          </p>

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-black/40 text-white"
          />

          <div className="flex gap-3 mt-3">
            <button
              onClick={handleReplySubmit}
              className="bg-red-600 px-4 py-1 rounded-lg text-sm"
            >
              Reply
            </button>

            <button
              onClick={() => {
                setShowReply(false);
                setReplyText("");
              }}
              className="border border-red-500 px-4 py-1 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 Replies Section */}
      {showReplies && (
        <div className="ml-6 mt-4 border-l border-red-500/20 pl-4 space-y-3">

          {replies.map((reply) => (
            <div key={reply._id}>

              <CommentCard comment={reply} />

              {/* 🔥 Child Reply Box */}
              {activeReplyId === reply._id && (
                <div className="mt-2">
                  <textarea
                    className="w-full bg-black/40 p-2 rounded"
                    placeholder={`Replying to @${reply.author.username}`}
                  />
                </div>
              )}

              <button
                className="text-xs text-red-400"
                onClick={() => {
                  setShowReply(false);
                  setActiveReplyId(reply._id);
                }}
              >
                Reply to this
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default CommentCard;