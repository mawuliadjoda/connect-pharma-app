import { Form, BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
// import PharmacyList from "./pages/pharmacies/PharmacyList";
// import AddPharmacy from "./pages/pharmacies/add/AddPharmacy";
// import NearestPharmacies from "./pages/pharmacies/NearestPharmacies/NearestPharmacies";
import PopulatePharmacies from "./pages/pharmacies/Populate/PopulatePharmacies";
import PrivateRoutes from "./utils/PrivateRoutes";
import ForgotPassword from "./pages/auth/ForgotPassword";
import MyOnlineClient from "./pages/ClientHistory/MyOnlineClient";
import AllOnlineClient from "./pages/ClientHistory/AllOnlineClient";
// import PharmacyListFireStorePagination from "./pages/pharmacies/PharmacyListFireStorePagination";
import PharmacyListCustomPaginaton from "./pages/pharmacies/PharmacyListCustomPaginaton";
// import NearestPharmaciesPage from "./pages/pharmacies/NearestPharmacies/NearestPharmaciesPage";
import AddPharmacyPage from "./pages/pharmacies/add/AddPharmacyPage";
import PharmacyListFireStorePagination from "./pages/pharmacies/PharmacyList/PharmacyListFireStorePagination";
import DutyDrugstorePage from "./pages/admin/dutyDrugstorePage";
import NearestPharmaciesHomePage from "./pages/pharmacies/NearestPharmacies/NearestPharmaciesHomePage";
import ProtectedRoute from "./utils/ProtectedRoute";
// import DutyDrugstore from "./pages/admin/dutyDrugstorePage";
// import CardAnimation from "./pages/pharmacies/CardAnimation/CardAnimation";








function App() {

  return (
    <>
      {/*  
  
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
          <Route path="/nearestPharmacies/:latitude/:longitude/:userTelephone" element={<NearestPharmacies />} ></Route>
          <Route path="/pharmacies/add/:latitude/:longitude/:userTelephone" element={<AddPharmacy  />} />
          <Route path="/pharmacies/populate" element={<PopulatePharmacies  />} />
          
        </Route>
        
        <Route path="/auth/register" element={<RegisterIndex />}></Route>
        <Route path="/auth/login" element={<LoginIndex />}></Route>
      </Routes>

    */}

      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<AuthLayout />}>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/userList" element={<UserList />}></Route>
              <Route path="/form" element={<Form />}></Route>
              <Route path="/learnSuspense" element={<LearnSuspense />}></Route>
              <Route path="/addUser" element={<AddUser />} ></Route>
              <Route path="/editUser" element={<EditUser />} ></Route>
              {/* <Route path="/pharmacies" element={<PharmacyList />} ></Route> */}
              <Route path="/pharmacies/populate" element={<PopulatePharmacies />} />
              <Route path="/*" element={<NotFound />}></Route>


              {/* <Route path="/pagination" element={<PharmacyListPagination />}></Route> */}
              <Route path="/pagination" element={<PharmacyListFireStorePagination />}></Route>
              <Route path="/pharmacies" element={<PharmacyListCustomPaginaton />}></Route>

              
              <Route path="/onlineClients" element={<MyOnlineClient />}></Route>
              <Route path="/allOnlineClients" element={<AllOnlineClient />}></Route>

              <Route path="/admin/dutyDrugstore" element={<DutyDrugstorePage />}></Route>

              
              
            </Route>
          </Route>


          <Route path="/" element={<AuthLayout />}></Route>
          
          
          
          <Route path="/.well-known/assetlinks.json" element={<ProtectedRoute isAllowed={true} redirectTo="/.well-known/assetlinks.json"  />}></Route>
          <Route path="/android/android-launchericon-512-512.png" element={<ProtectedRoute isAllowed={true} redirectTo="/android/android-launchericon-512-512.png"  />}></Route>
          
          
          
          
          {/* <Route path="/nearestPharmacies/:latitude?/:longitude?/:userTelephone?" element={<NearestPharmaciesPage />} ></Route> */}
          <Route path="/nearestPharmacies/:latitude?/:longitude?/:userTelephone?" element={<NearestPharmaciesHomePage />} ></Route>
          <Route path="/pharmacies/add/:latitude?/:longitude?/:userTelephone?" element={<AddPharmacyPage />} />
          {/* <Route path="/animation" element={<CardAnimation props="animation" />}></Route> */}

          <Route path="/*" element={<NotFound />}></Route>

          <Route path="/auth/register/:userTelephone/:userEmail" element={<RegisterIndex />}></Route>
          <Route path="/auth/login" element={<LoginIndex />}></Route>
          <Route path="/reset/password" element={<ForgotPassword />}></Route>
        </Routes>
      </Router>

    </>





  );
}

export default App;
