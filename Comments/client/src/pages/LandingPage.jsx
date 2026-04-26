import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (localStorage.getItem("token")) {
      navigate("/createComment", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-red-600 opacity-20 blur-[150px] rounded-full top-[-100px]"></div>

      {/* Content */}
      <div className="relative text-center max-w-2xl">

        <h1 className="text-5xl font-extrabold mb-6">
          <span className="text-white">Speak Your Mind</span>
          <br />
          <span className="text-red-500 drop-shadow-[0_0_10px_red]">
            Without Limits
          </span>
        </h1>

        <p className="text-gray-400 mb-8 text-lg">
          A place where you can post comments freely, share thoughts, and
          engage with others — no filters, just real conversations.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-red-600 rounded-xl shadow-lg shadow-red-500/40 hover:bg-red-700 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 border border-red-500 rounded-xl hover:bg-red-500/10 transition"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Floating cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

        {["Post Freely", "Engage Instantly", "Stay Anonymous"].map((text, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6 text-center hover:scale-105 hover:shadow-red-500/20 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-red-400 mb-2">
              {text}
            </h3>
            <p className="text-gray-400 text-sm">
              Experience seamless interaction with a futuristic comment system.
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LandingPage;