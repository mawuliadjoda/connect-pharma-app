import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../services/db';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import LoginIndex from '../pages/auth/Login';


// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
// https://www.youtube.com/watch?v=2k8NleFjG7I&t=61s

const PrivateRoutes = () => {

    // const [user, setUser] = useState<User>();
    const [conectedUser, setConectedUser] = useState<User | null>();
    
    useEffect(() =>  {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setConectedUser(user)
            } else {
                
                setConectedUser(undefined);
            }
        });
        return () => unsubscribe();
    }, []);

 
    return conectedUser ? <Outlet /> : <LoginIndex />;

  
    /*
    const [user, loading, error] = useAuthState(auth);  
    return (
        user?.refreshToken ? <Outlet /> : <Navigate to="/auth/login" />
    )
    */
}

export default PrivateRoutes