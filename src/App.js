import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import AppPage from "./pages/AppPage";
import SetAvatar from "./components/SetAvatar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
         {/* // Login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* // Register page */}
        <Route path="/register" element={<RegisterPage />} />
        {/* // Avatar page */}
        <Route path="/setAvatar" element={<SetAvatar />} />
        {/* // App page */}
        <Route path="/app" element={<AppPage />} />  
        {/* // Default path to login page */}
        <Route path="/" element={<LoginPage />} />
        {/* // If page not found */}
        <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
