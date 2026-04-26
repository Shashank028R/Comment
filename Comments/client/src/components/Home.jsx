import { useRef } from "react";
import CommentCard from "./CommentCard";

const Home = () => {
  const commentRef = useRef();

  const scrollToComments = () => {
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-y-auto transition-all duration-300">
      {/* 🔥 HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Glow background */}
        <div className="absolute w-[600px] h-[600px] bg-red-600 opacity-20 blur-[150px] rounded-full top-[-150px] animate-pulse"></div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-6">
          <span className="text-white">Express Yourself</span>
          <br />
          <span className="text-red-500 drop-shadow-[0_0_10px_red]">
            Without Limits 🔥
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 max-w-xl mb-8">
          Share your thoughts, explore conversations, and engage with the
          community — all in one place.
        </p>

        {/* CTA */}
        <button
          onClick={scrollToComments}
          className="px-6 py-3 bg-red-600 rounded-xl shadow-lg shadow-red-500/40 hover:bg-red-700 transition transform hover:scale-105"
        >
          Explore Comments ↓
        </button>

        {/* Scroll hint */}
        <div className="absolute bottom-6 text-gray-500 animate-bounce">
          ↓ Scroll
        </div>
      </section>

      {/* 💬 COMMENTS SECTION */}
      <section
        ref={commentRef}
        className="min-h-screen px-6 py-12 bg-gradient-to-b from-black to-gray-900 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-red-400 mb-6">
          Latest Comments 💬
        </h2>

        {/* Comments container */}
        <div className="space-y-4">
          {/* Dummy cards (replace with API later) */}
          {[1, 2, 3].map((i) => (
            <CommentCard
              key={i}
              user={{ username: "Shashank" }}
              message={`This is a premium comment UI example #${i}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
