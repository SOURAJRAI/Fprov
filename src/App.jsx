import { Routes, Route } from "react-router-dom";

import "./App.css";
import TableData from "./components/TableData";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Navbar from "./components/navbar";
import Layout from "./utils/layout";
import Dashboard from "./components/Dashboard";
import AdminRoute from "./utils/AdminCheck";



function App() {




  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<TableData />} />
          
            <Route path="/dashboard" element={<AdminRoute> <Dashboard /></AdminRoute>} />
        
          
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
