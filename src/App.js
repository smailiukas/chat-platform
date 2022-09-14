import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
         {/* // Login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* // Register page */}
        <Route path="/register" element={<RegisterPage />} />  
        {/* // Default path to login page */}
        <Route path="/" element={<LoginPage />}/>
        {/* // If page not found */}
        <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
