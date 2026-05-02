import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: "",
    profilePicture: "",
  });

  // 🔥 Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${BACKEND_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // 🔥 Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Update profile
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(`${BACKEND_URL}/api/profile`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
      setEditMode(false);

      toast.success("Profile updated ✅");
    } catch {
      toast.error("Update failed ❌");
    }
  };

  if (!user) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative">
      {/* 🔴 Glow */}
      <div className="absolute w-[600px] h-[600px] bg-red-600 opacity-20 blur-[150px] rounded-full top-[-150px] animate-pulse"></div>

      <div className="relative w-full max-w-md bg-white/5 border border-red-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-lg shadow-red-500/20">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={form.profilePicture || "https://i.pravatar.cc/100"}
            className="w-24 h-24 rounded-full border-2 border-red-500 object-cover"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            disabled={!editMode}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/40 text-white border border-red-500/20"
          />
        </div>

        {/* Email (readonly) */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm">Email</label>
          <input
            type="text"
            value={user.email}
            disabled
            className="w-full mt-1 p-2 rounded bg-black/40 text-gray-400 border border-red-500/20"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm">Profile Picture URL</label>
          <input
            type="text"
            name="profilePicture"
            value={form.profilePicture}
            disabled={!editMode}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/40 text-white border border-red-500/20"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 border border-red-500 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-red-600 hover:bg-red-700 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
