import { useState } from "react";
import { Home, User, Plus } from "lucide-react";

const Sidebar = ({ setActive, active }) => {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", icon: <Home size={22} />, key: "home" },
    { name: "Create", icon: <Plus size={22} />, key: "create" },
    { name: "Profile", icon: <User size={22} />, key: "profile" },
  ];

  return (
    <>
      {/* 🔴 Subtle ambient glow behind the sidebar when open */}
      <div 
        className={`fixed top-1/2 -translate-y-1/2 left-0 h-64 bg-red-600/20 blur-[80px] rounded-full transition-all duration-700 pointer-events-none z-40 ${
          open ? "w-32 opacity-100" : "w-10 opacity-0"
        }`}
      />

      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`
          fixed top-1/2 -translate-y-1/2 left-4 z-50
          flex flex-col gap-2 p-3
          bg-white/[0.02] backdrop-blur-2xl
          border border-white/5
          shadow-2xl shadow-black/50
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${open ? "w-48 rounded-2xl" : "w-[72px] rounded-2xl"}
        `}
      >
        {menu.map((item, i) => {
          const isActive = active === item.key;

          return (
            <div
              key={i}
              onClick={() => setActive(item.key)}
              className={`
                relative flex items-center gap-3 cursor-pointer p-2 rounded-xl
                transition-all duration-300 group overflow-hidden
                ${isActive 
                  ? "bg-red-500/10 border border-red-500/20" 
                  : "border border-transparent hover:bg-white/5"
                }
              `}
            >
              {/* 🔥 Active Indicator (Vertical glowing line) */}
              <div 
                className={`
                  absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-red-500 shadow-[0_0_10px_red] transition-all duration-300
                  ${isActive ? "h-1/2 opacity-100" : "h-0 opacity-0"}
                `}
              />

              {/* 🔴 Icon Container */}
              <div
                className={`
                  min-w-[40px] h-[40px] flex items-center justify-center rounded-lg transition-all duration-300
                  ${isActive 
                    ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] scale-110" 
                    : "text-gray-400 group-hover:text-red-400 group-hover:scale-110"
                  }
                `}
              >
                {item.icon}
              </div>

              {/* ✨ Text */}
              <span
                className={`
                  whitespace-nowrap font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${open 
                    ? "opacity-100 translate-x-0 text-white" 
                    : "opacity-0 -translate-x-4 w-0 hidden"
                  }
                  ${isActive ? "text-red-100" : "text-gray-300"}
                `}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;