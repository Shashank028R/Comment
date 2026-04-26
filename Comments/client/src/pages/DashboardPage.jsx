import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import Profile from "../components/Profile";
import CreateCommentCard from "../components/CreateCommentCard";

const DashboardPage = () => {
  const [active, setActive] = useState("home");

  const renderContent = () => {
    switch (active) {
      case "home":
        return <Home />;
      case "create":
        return <CreateCommentCard />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex bg-black min-h-screen">
      
      {/* Sidebar */}
      <Sidebar setActive={setActive} />

      {/* Main Content */}
      <div className="flex-1">
        {renderContent()}
      </div>

    </div>
  );
};

export default DashboardPage;