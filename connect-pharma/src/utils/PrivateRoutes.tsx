import { Outlet } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react';
import LoginIndex from '../pages/auth/Login';
import { User } from '../pages/Users/User';


// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
// https://www.youtube.com/watch?v=2k8NleFjG7I&t=61s
// https://johnwcassidy.medium.com/firebase-authentication-hooks-and-context-d0e47395f402

/*
    const [user, loading, error] = useAuthState(auth);  
    return (
        user?.refreshToken ? <Outlet /> : <Navigate to="/auth/login" />
    )
*/

// TO see https://codingpr.com/react-firebase-auth-tutorial/

// const usersRef = collection(getDb(), 'users');
 // https://firebase.google.com/docs/firestore/query-data/get-data?hl=fr


export const UserContext = createContext<User>(null);
const PrivateRoutes = () => {
    const [conectedUser, setConectedUser] = useState<User>();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setConectedUser(foundUser);
          // console.log(`------- Connected user from PrivateRoute-----: ${JSON.stringify(foundUser)}`);
        }
      }, []);
   
    return conectedUser?.roles  ?  <UserContext.Provider value={conectedUser}>   <Outlet />  </UserContext.Provider> : <LoginIndex />;
}

export default PrivateRoutes