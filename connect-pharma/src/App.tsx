import React from "react";
import { Route, Routes } from "react-router-dom";

import Table from "./pages/Table";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./pages/auth/Login";
import Blank from "./pages/Blank";
import NotFound from "./pages/NotFound";
import Form from "./pages/Form";
import RegisterIndex from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/blank" element={<Blank />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/profile" element={<Blank />}></Route>

        <Route path="/addUser" element={<AddUser />} ></Route>
        <Route path="/editUser" element={<EditUser />} ></Route>
        
      </Route>
      <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<RegisterIndex />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
