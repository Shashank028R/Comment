import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";

const Home = () => {
  const commentRef = useRef();
  const [comments, setComments] = useState([]);

  const scrollToComments = () => {
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // 🔥 Fetch parent comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/getComments"
        );
        setComments(res.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-y-auto transition-all duration-300">

      {/* 🔥 HERO SECTION (UNCHANGED) */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-red-600 opacity-20 blur-[150px] rounded-full top-[-150px] animate-pulse"></div>

        <h1 className="text-5xl font-extrabold mb-6">
          <span className="text-white">Express Yourself</span>
          <br />
          <span className="text-red-500 drop-shadow-[0_0_10px_red]">
            Without Limits 🔥
          </span>
        </h1>

        <p className="text-gray-400 max-w-xl mb-8">
          Share your thoughts, explore conversations, and engage with the
          community — all in one place.
        </p>

        <button
          onClick={scrollToComments}
          className="px-6 py-3 bg-red-600 rounded-xl shadow-lg shadow-red-500/40 hover:bg-red-700 transition transform hover:scale-105"
        >
          Explore Comments ↓
        </button>

        <div className="absolute bottom-6 text-gray-500 animate-bounce">
          ↓ Scroll
        </div>
      </section>

      {/* 💬 COMMENTS SECTION (UPDATED) */}
      <section
        ref={commentRef}
        className="min-h-screen px-6 py-12 bg-gradient-to-b from-black to-gray-900 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-red-400 mb-6">
          Latest Comments 💬
        </h2>

        <div className="space-y-4">

          {/* 🔥 Real Data */}
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No comments yet... 😶
            </p>
          )}

        </div>
      </section>
    </div>
  );
};

export default Home;