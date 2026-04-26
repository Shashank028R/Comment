import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";
import LogoutButton from "./LogoutButton"; // 🔥 ADDED IMPORT

const Home = () => {
  const commentRef = useRef();

  const [comments, setComments] = useState([]);
  
  // 🔥 GLOBAL reply state (IMPORTANT)
  const [activeReply, setActiveReply] = useState(null);

  // 🔥 Check if the user is logged in to show the logout button
  const isLoggedIn = !!localStorage.getItem("token");

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
    // Changed bg-black to bg-[#050505] and added relative z-0 to match the premium theme
    <div className="bg-[#050505] text-white min-h-screen overflow-y-auto transition-all duration-300 relative z-0">

      {/* 🔥 LOGOUT BUTTON (Only shows if user is logged in) */}
      {isLoggedIn && <LogoutButton />}

      {/* 🔥 HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-red-600 opacity-20 blur-[150px] rounded-full top-[-150px] animate-pulse pointer-events-none"></div>

        <h1 className="text-5xl font-extrabold mb-6 relative z-10">
          <span className="text-white">Express Yourself</span>
          <br />
          <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            Without Limits 🔥
          </span>
        </h1>

        <p className="text-gray-400 max-w-xl mb-8 relative z-10">
          Share your thoughts, explore conversations, and engage with the
          community — all in one place.
        </p>

        <button
          onClick={scrollToComments}
          className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 font-semibold rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 relative z-10"
        >
          Explore Comments ↓
        </button>

        <div className="absolute bottom-6 text-gray-500 animate-bounce">
          ↓ Scroll
        </div>
      </section>

      {/* 💬 COMMENTS SECTION */}
      <section
        ref={commentRef}
        className="min-h-screen px-6 py-12 bg-gradient-to-b from-[#050505] to-black max-w-5xl mx-auto relative z-10"
      >
        <h2 className="text-3xl font-bold text-red-400 mb-6 drop-shadow-sm">
          Latest Comments 💬
        </h2>

        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                activeReply={activeReply}        // 🔥 PASS DOWN
                setActiveReply={setActiveReply}  // 🔥 PASS DOWN
              />
            ))
          ) : (
            <p className="text-gray-500 text-center bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-md">
              No comments yet... 😶 Be the first to share your thoughts!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;