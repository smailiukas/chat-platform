import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />  
        <Route path="/" element={<LoginPage />}/>
    </Routes>
  );
}

export default App;
