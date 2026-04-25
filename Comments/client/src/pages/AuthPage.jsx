import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        alert("Login Successful");
        navigate("/dashboard", { replace: true });
      } else {
        alert("Registration Successful");
        setIsLogin(true);
      }
    } catch (error) {
      if (error.response) {
        console.log("Backend Error: ", error.response.message);
        alert("Backend Error");
      } else if (error.request) {
        console.log("No response from the server: ", error.response);
        alert("Server is not responding.");
      } else {
        console.log("Error: ", error.message);
        alert("Error Occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl w-[350px] text-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none"
            />
          )}

          <input
            type={isLogin ? "text" : "email"}
            name="email"
            placeholder="Email or Username"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-300 cursor-pointer ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
