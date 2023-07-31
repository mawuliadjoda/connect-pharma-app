import { Form, Route, Routes } from "react-router-dom";
import AuthLayout from './components/Layout/AuthLayout';



import NotFound from './pages/NotFound';
//import AddUser from './pages/AddUser';
//import EditUser from './pages/EditUser';
//import GuestLayout from './components/Layout/GuestLayout';
// import LoginIndex from './pages/auth/Login/index';
import RegisterIndex from './pages/auth/Register/index';
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import LearnSuspense from './learnReact/suspense/LearnSuspense';
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";







function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/userList" element={<UserList />}></Route>
       
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/learnSuspense" element={<LearnSuspense />}></Route>
        <Route path="/addUser" element={<AddUser />} ></Route>
        <Route path="/editUser" element={<EditUser />} ></Route>
       {/*   
        <Route path="/profile" element={<Blank />}></Route>

        
        <Route path="/editUser" element={<EditUser />} ></Route>
      */}
        
      </Route>
      
      <Route path="/auth/register" element={<RegisterIndex />}></Route>
    </Routes>
  );
}

export default App;
