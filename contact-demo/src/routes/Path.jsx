import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import RouteGuard from "../components/RouteGuard";
import Create from "../pages/Create";
import UserInfo from "../pages/UserInfo";

const Path = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create/>}/>
        <Route path="/user/:id" element={<UserInfo/>}/>

      </Routes>
    </div>
  );
};

export default Path;
