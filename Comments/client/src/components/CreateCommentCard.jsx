import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const CreateComment = () => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return toast.error("Comment cannot be empty ");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return toast.error("You must be logged in to post a comment ");
      }
      const url = `${BACKEND_URL}/api/comments`;
      const { data } = await axios.post(
        url,
        { message: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Comment posted ");
      setComment("");
    } catch (error) {
      toast.error("Failed to post comment ");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* 🔴 Glow background */}
      <div className="absolute w-[600px] h-[600px] bg-red-600 opacity-20 blur-[150px] rounded-full top-[-150px] animate-pulse"></div>

      {/* Card */}
      <div className="relative w-full max-w-xl backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-2xl p-6 shadow-lg shadow-red-500/10 transition-all duration-500">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Share Your Thoughts 💬
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Textarea */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300 resize-none"
          />

          {/* Character Count */}
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{comment.length} characters</span>
            {comment.length > 200 && (
              <span className="text-red-400">Too long ⚠️</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold text-white shadow-md shadow-red-500/30 hover:shadow-red-500/60 transition-all duration-300 transform hover:scale-105"
            >
              Post Comment
            </button>

            <button
              type="button"
              onClick={() => setComment("")}
              className="flex-1 border border-red-500 text-red-400 hover:bg-red-500/10 py-2 rounded-lg transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
