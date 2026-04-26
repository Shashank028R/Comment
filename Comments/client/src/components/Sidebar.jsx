import { useState } from "react";
import { Home, User, Plus } from "lucide-react";

const Sidebar = ({ setActive, active }) => {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", icon: <Home size={20} />, key: "home" },
    { name: "Create", icon: <Plus size={20} />, key: "create" },
    { name: "Profile", icon: <User size={20} />, key: "profile" },
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`
        fixed top-1/2 -translate-y-1/2 left-3
        flex flex-col gap-4 p-3
        bg-white/5 backdrop-blur-xl
        border border-red-500/20
        shadow-lg shadow-red-500/10
        transition-all duration-300
        ${open ? "w-44" : "w-14"}
        rounded-r-2xl
      `}
    >
      {menu.map((item, i) => {
        const isActive = active === item.key;

        return (
          <div
            key={i}
            onClick={() => setActive(item.key)}
            className={`
              flex items-center gap-3 cursor-pointer p-2 rounded-lg
              transition-all duration-300 group
              ${isActive 
                ? "bg-red-500/20 shadow-md shadow-red-500/40 text-red-300" 
                : "text-red-400 hover:bg-red-500/10"
              }
            `}
          >
            {/* 🔴 Icon with glow */}
            <div
              className={`
                transition-all duration-300
                ${isActive ? "scale-110 drop-shadow-[0_0_6px_red]" : "group-hover:scale-110"}
              `}
            >
              {item.icon}
            </div>

            {/* ✨ Text */}
            <span
              className={`
                whitespace-nowrap transition-all duration-300
                ${open 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                }
              `}
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;