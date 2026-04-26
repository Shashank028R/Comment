import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all user data from local storage
    localStorage.clear();
    
    toast.success("Logged out successfully 👋");
    
    // Redirect to your login/auth page
    navigate("/login"); // Change this if your login route is different (e.g., "/login")
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-6 right-6 z-50 group flex items-center justify-start p-[12px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-[48px] hover:w-[130px] overflow-hidden"
    >
      {/* Icon (Always Visible) */}
      <div className="text-gray-400 group-hover:text-red-400 transition-colors duration-300 flex-shrink-0 drop-shadow-md">
        <LogOut size={22} />
      </div>
      
      {/* Text (Fades and slides in on hover) */}
      <span className="ml-3 font-medium text-red-200 whitespace-nowrap opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
        Log Out
      </span>
    </button>
  );
};

export default LogoutButton;