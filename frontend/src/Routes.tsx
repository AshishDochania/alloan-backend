import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login ";
import Home from "./pages/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./pages/firebaseConfig";

// const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
//   const [user, loading] = useAuthState(auth);
  
//   if (loading) return <p>Loading...</p>;
//   return user ? children : <Navigate to="/login" />;
// };

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
