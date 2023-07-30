import React from "react";
import { Form, Route, Routes } from "react-router-dom";
import AuthLayout from './components/Layout/AuthLayout';
import Dashboard from './pages/Dashboard';
import Table from './pages/Table';
import Blank from './pages/Blank';
import NotFound from './pages/NotFound';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import GuestLayout from './components/Layout/GuestLayout';
import LoginIndex from './pages/auth/Login/index';
import RegisterIndex from './pages/auth/Register/index';



function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/blank" element={<Blank />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/profile" element={<Blank />}></Route>

        <Route path="/addUser" element={<AddUser />} ></Route>
        <Route path="/editUser" element={<EditUser />} ></Route>
        
      </Route>
      <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<LoginIndex />}></Route>
        <Route path="/auth/register" element={<RegisterIndex />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
