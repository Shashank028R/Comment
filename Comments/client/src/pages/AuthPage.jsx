import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // 🔥 NEW: Track if we are in the OTP verification step
  const [isVerifying, setIsVerifying] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    otp: "", // 🔥 NEW: Added OTP to the form state
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ---------------------------------------------
      // 1. HANDLE OTP VERIFICATION SUBMISSION
      // ---------------------------------------------
      if (isVerifying) {
        const url = `${BACKEND_URL}/api/auth/verify-email`;
        await axios.post(url, { email: form.email, otp: form.otp });

        toast.success("Email verified! You can now login. 🎉");
        setIsVerifying(false);
        setIsLogin(true); // Switch to login screen
        return;
      }

      // ---------------------------------------------
      // 2. HANDLE LOGIN & REGISTER SUBMISSION
      // ---------------------------------------------
      const url = isLogin
        ? `${BACKEND_URL}/api/auth/login`
        : `${BACKEND_URL}/api/auth/register`;

      const { data } = await axios.post(url, form);

      if (isLogin) {
        // SAVING BOTH TOKEN AND USER ID
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);

        toast.success("Login successful 🚀");
        navigate("/", { replace: true });
      } else {
        // 🔥 CHANGED: Instead of switching to login, switch to OTP view
        toast.success("OTP sent to your email! 📩");
        setIsVerifying(true);
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
        {/* Dynamic Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isVerifying
            ? "Verify Email ✉️"
            : isLogin
              ? "Welcome Back 👋"
              : "Create Account 🚀"}
        </h2>

        {isVerifying && (
          <p className="text-center text-sm text-gray-400 mb-4">
            We sent a 6-digit code to{" "}
            <span className="text-white font-semibold">{form.email}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* ------------------------------------------- */}
          {/* OTP VIEW */}
          {/* ------------------------------------------- */}
          {isVerifying ? (
            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit code"
              maxLength="6"
              onChange={handleChange}
              className="px-4 py-2 text-center tracking-[0.5em] rounded-lg bg-white/10 border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300"
              required
            />
          ) : (
            /* ------------------------------------------- */
            /* STANDARD LOGIN/REGISTER VIEW */
            /* ------------------------------------------- */
            <>
              {!isLogin && (
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300"
                  required={!isLogin}
                />
              )}
              <input
                type="email"
                name="email"
                placeholder={isLogin ? "Email or Username" : "Email"}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-white/10 border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-white/10 border border-transparent focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all duration-300"
                required
              />
            </>
          )}

          {/* Dynamic Submit Button */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold shadow-md shadow-red-500/30 hover:shadow-red-500/60 transition-all duration-300 transform hover:scale-105"
          >
            {isVerifying ? "Verify Code" : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Dynamic Toggle Footer */}
        <p className="text-center mt-4 text-sm text-gray-400">
          {isVerifying ? (
            <span
              onClick={() => setIsVerifying(false)}
              className="text-red-400 cursor-pointer ml-1 hover:underline"
            >
              Cancel Verification
            </span>
          ) : isLogin ? (
            <>
              Don't have an account?
              <span
                onClick={() => setIsLogin(false)}
                className="text-red-400 cursor-pointer ml-1 hover:underline"
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?
              <span
                onClick={() => setIsLogin(true)}
                className="text-red-400 cursor-pointer ml-1 hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
