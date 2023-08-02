import { Form, Route, Routes } from "react-router-dom";
import AuthLayout from './components/Layout/AuthLayout';



import NotFound from './pages/NotFound';
//import AddUser from './pages/AddUser';
//import EditUser from './pages/EditUser';
//import GuestLayout from './components/Layout/GuestLayout';
// import LoginIndex from './pages/auth/Login/index';
import RegisterIndex from './pages/auth/Register/index';
import Dashboard from "./pages/Dashboard";
import LearnSuspense from './learnReact/suspense/LearnSuspense';
import AddUser from "./pages/Users/AddUser";
import UserList from "./pages/Users/UserList";
import EditUser from "./pages/Users/EditUser";
import LoginIndex from "./pages/auth/Login";
import PharmacyList from "./pages/pharmacies/PharmacyList";
import AddPharmacy from "./pages/pharmacies/AddPharmacy";
import NearestPharmacies from "./pages/pharmacies/NearestPharmacies";
import PopulatePharmacies from "./pages/pharmacies/PopulatePharmacies";








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
      
        <Route path="/pharmacies" element={<PharmacyList />} ></Route>
        <Route path="/nearestPharmacies/:latitude/:longitude" element={<NearestPharmacies />} ></Route>
        <Route path="/pharmacies/add" element={<AddPharmacy  />} />
        <Route path="/pharmacies/populate" element={<PopulatePharmacies  />} />
        
      </Route>
      
      <Route path="/auth/register" element={<RegisterIndex />}></Route>
      <Route path="/auth/login" element={<LoginIndex />}></Route>
    </Routes>
  );
}

export default App;
