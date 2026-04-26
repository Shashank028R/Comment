import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://localhost:3000/api/auth/login"
        : "http://localhost:3000/api/auth/register";

      const { data } = await axios.post(url, form);

      if (isLogin) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful 🚀");
        navigate("/", { replace: true });
      } else {
        toast.success("Registration successful 🎉");
        setIsLogin(true);
      }
    } catch (error) {
      if (error.response) {
      toast.error(error.response.data?.message || "Backend error ❌");
    } else if (error.request) {
      toast.error("Server not responding ⚠️");
    } else {
      toast.error("Something went wrong 😬");
    }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* 🔴 Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-red-600 opacity-20 blur-[150px] rounded-full top-[-100px] animate-pulse"></div>

      {/* Card */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-red-500/20 p-8 rounded-2xl shadow-lg shadow-red-500/10 w-[350px] text-white transition-all duration-500">

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Username (register only) */}
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-white/10 border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300"
            />
          )}

          {/* Email */}
          <input
            type="text"
            name="email"
            placeholder="Email or Username"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white/10 border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white/10 border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300"
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold shadow-md shadow-red-500/30 hover:shadow-red-500/60 transition-all duration-300 transform hover:scale-105"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center mt-4 text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-400 cursor-pointer ml-1 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default AuthPage;