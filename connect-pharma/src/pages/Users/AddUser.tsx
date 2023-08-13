import Navbar from "../../components/Navbar/Index";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { getDb } from "../../services/db";
import { User } from "./User";
import UserForm from "./UserForm";
import { useState } from "react";


function AddUser() {
    const [sidebarToggle] = useOutletContext<any>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const initialUserData: User = { id: undefined, name: '', username: '', email: '' };

    const addUser = (user: User) => {
        setIsLoading(true);
        const data = {
            name: user!.name,
            username: user!.username,
            email: user!.email,
            roles: ["user"]
        }

        /*   Firebase v9    */
        const usersRef = collection(getDb(), 'users');
        addDoc(usersRef, data)
            .then(() => {
                setIsLoading(false);
                navigate("/userList");
                console.log("Data sucessfuly submitted")
            })
            .catch((error) => {
                console.log("Error adding document:", error);
            });
    }

    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />
                <UserForm onSubmit={addUser} initialUserData={initialUserData} isLoading={isLoading} />
            </main>
        </>
    );
}

export default AddUser;
