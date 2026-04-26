import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreateComment from "./pages/CreateComment";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid rgba(255,0,0,0.3)",
            boxShadow: "0 0 10px rgba(255,0,0,0.5)",
          },
          success: {
            iconTheme: {
              primary: "#ff0000",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff0000",
              secondary: "#fff",
            },
          },
        }}
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/createComment" element={<CreateComment />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/explore" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
