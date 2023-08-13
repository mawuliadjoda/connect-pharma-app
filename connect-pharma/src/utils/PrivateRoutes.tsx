import { Outlet } from 'react-router-dom'
import { auth, getDb } from '../services/db';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import LoginIndex from '../pages/auth/Login';
import { collection, getDocs, query, where } from 'firebase/firestore';
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

const usersRef = collection(getDb(), 'users');

export const UserContext = createContext<User>(null);
const PrivateRoutes = () => {

    const [conectedUser, setConectedUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                getUserWithDetails(user.email!).then((userDetail) => {
                    setConectedUser(userDetail)
                }).catch(error => {
                    console.log(error)
                })

            } else {

                setConectedUser(undefined);
            }
        });
        return () => unsubscribe();
    }, []);



    const getUserWithDetails = async (email: string) => {
        const q = query(usersRef, where("email", "==", email));
        let user: User = null;
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size === 1) {
            querySnapshot.docs.map((doc) => {
                user = {
                    id: doc.id,
                    name: doc.data().name,
                    username: doc.data().username,
                    email: doc.data().email,
                    roles: doc.data().roles
                };
            })
        }
        return user;
    }


    return conectedUser 
    
    ?
    <UserContext.Provider value={conectedUser}>
        <Outlet /> 
    </UserContext.Provider>
     
     
     : <LoginIndex />;

}

export default PrivateRoutes