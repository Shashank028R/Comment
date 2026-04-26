import { useState } from "react";
import toast from "react-hot-toast";

const CreateCommentCard = () => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return toast.error("Empty comment ❌");

    toast.success("Comment created 🚀");
    setText("");
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl text-red-400 mb-4">Create Comment ✍️</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-white/10 p-3 rounded-lg border border-red-500/20 focus:border-red-500 outline-none"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Post
      </button>
    </div>
  );
};

export default CreateCommentCard;