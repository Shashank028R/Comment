import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/aboutUs", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden z-0">
      
      {/* Conditionally render the Logout Button if logged in */}
      {isLoggedIn && <LogoutButton />}

      {/* 🔥 DYNAMIC BACKGROUND LIGHTING 🔥 */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        {/* Top Center Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse"></div>
        {/* Bottom Left Glow */}
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-800/10 blur-[120px] rounded-full mix-blend-screen animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative text-center max-w-2xl z-10 animate-fade-in-up">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Speak Your Mind
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            Without Limits
          </span>
        </h1>

        <p className="text-gray-400 mb-10 text-lg font-light leading-relaxed max-w-xl mx-auto">
          A place where you can post comments freely, share thoughts, and
          engage with others — no filters, just real conversations.
        </p>

        <div className="flex justify-center gap-5">
          <button
            onClick={handleGetStarted}
            className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transform hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            {isLoggedIn ? "About Us" : "Get Started"}
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="px-8 py-3.5 bg-white/[0.03] border border-red-500/30 text-white font-semibold rounded-xl backdrop-blur-md hover:bg-white/[0.08] hover:border-red-500/60 transform hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Floating cards */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
        {[
          { title: "Post Freely", desc: "Share your unadulterated thoughts in a space built for raw honesty." },
          { title: "Engage Instantly", desc: "Real-time nested replies and dynamic likes keep the conversation flowing." },
          { title: "Stay Anonymous", desc: "Experience seamless interaction with a futuristic, secure comment system." }
        ].map((card, i) => (
          <div
            key={i}
            className="group bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-8 text-center hover:bg-white/[0.04] hover:border-red-500/30 hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            <h3 className="text-xl font-bold text-red-400 mb-3 group-hover:text-red-300 transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;