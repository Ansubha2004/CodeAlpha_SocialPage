import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/Sidebar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [loading,setLoading]=useState(true);
  const [user, setUser] = useState(null);

  const refreshUser = async () => {
    try {
      const result = await axios.get(`${url}/authapi/profile`, {
        withCredentials: true,
      });

      if (result.data.success) {
        setUser(result.data.data);
        return true;
      }

      setUser(null);
      return false;
    } catch (error) {
      console.log(
        "User data track error:",
        error.response?.data || error.message,
      );
      setUser(null);
      return false;
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      await refreshUser();
      setLoading(false);
    };
    checkUser();
  }, [url]);
  return (
    <div className="relative w-screen h-screen overflow-x-hidden flex">
      <Sidebar user={user} setUser={setUser} url={url} />
      <div className="h-full relative flex-1 flex flex-col min-h-0 overflow-x-hidden">
        <main className="flex-1 overflow-y-auto hide-scrollbar min-h-0 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <Home user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login  refreshUser={refreshUser} />} />
            <Route path="/register" element={<Register  refreshUser={refreshUser}  />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
