import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Link as LinkIcon, Edit2, Check, X, Camera } from "lucide-react";
import LogoutButton from "./LogoutButton"; // Make sure the path is correct!

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [form, setForm] = useState({
    username: "",
    profilePicture: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://comments-backend-934h.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        setForm({
          username: res.data.username,
          profilePicture: res.data.profilePicture || "",
        });
      } catch {
        toast.error("Failed to load profile ❌");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "https://comments-backend-934h.onrender.com/api/profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data);
      setEditMode(false);
      toast.success("Profile updated ✅");
    } catch {
      toast.error("Update failed ❌");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden z-0">
      
      {/* 🔥 LOGOUT BUTTON ADDED HERE 🔥 */}
      <LogoutButton />

      {/* 🔥 DYNAMIC BACKGROUND LIGHTING 🔥 */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-red-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
        <div 
          className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-red-800/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" 
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* 🪟 TRANSLUCENT GLASS CARD 🪟 */}
      <div 
        className={`relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(255,0,0,0.1)] transition-all duration-700 ease-out transform ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-sm">
            Your Profile
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-light">Manage your account details</p>
        </div>

        <div className="flex justify-center mb-8 relative z-10">
          <div className="relative group cursor-pointer">
            <img
              src={form.profilePicture || "https://i.pravatar.cc/150"}
              className="relative w-28 h-28 rounded-full border border-red-500/50 object-cover shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-transform duration-500 group-hover:scale-105"
              alt="Profile"
            />
            {editMode && (
              <div className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full border border-red-900 shadow-lg shadow-red-500/40">
                <Camera size={16} className="text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5 relative z-10">
          <div className="group">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block ml-1 group-focus-within:text-red-400 transition-colors drop-shadow-md">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-400 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                name="username"
                value={form.username}
                disabled={!editMode}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/5 text-white transition-all duration-300 outline-none backdrop-blur-sm ${
                  editMode ? "focus:border-red-500/50 focus:bg-black/40 focus:ring-1 focus:ring-red-500/50" : "opacity-70 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          <div className="group">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block ml-1 drop-shadow-md">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input
                type="text"
                value={user.email}
                disabled
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/5 text-gray-400 opacity-70 cursor-not-allowed outline-none backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="group">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block ml-1 group-focus-within:text-red-400 transition-colors drop-shadow-md">
              Avatar URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-400 transition-colors">
                <LinkIcon size={18} />
              </div>
              <input
                type="text"
                name="profilePicture"
                value={form.profilePicture}
                disabled={!editMode}
                onChange={handleChange}
                placeholder="https://example.com/avatar.png"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/5 text-white transition-all duration-300 outline-none backdrop-blur-sm ${
                  editMode ? "focus:border-red-500/50 focus:bg-black/40 focus:ring-1 focus:ring-red-500/50" : "opacity-70 cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 relative z-10 transition-all duration-300">
          {editMode ? (
            <div className="flex gap-4 animate-fade-in">
              <button onClick={handleUpdate} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium py-3 px-4 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.4)] transform hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
                <Check size={18} /> Save Changes
              </button>
              <button onClick={() => { setEditMode(false); setForm({ username: user.username, profilePicture: user.profilePicture || "" }); }} className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 transform hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
                <X size={18} /> Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setEditMode(true)} className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl border border-white/10 hover:border-red-500/40 hover:text-red-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transform hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              <Edit2 size={18} /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;