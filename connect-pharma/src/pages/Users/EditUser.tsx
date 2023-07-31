import Navbar from "../../components/Navbar/Index";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import firebase from '../../firebase';
import { User } from "./User";
import UserForm from "./UserForm";

function EditUser() {
    const location = useLocation();
    const navigate = useNavigate();

    const [sidebarToggle] = useOutletContext<any>();

    const initialUserData: User = location.state;

    const updateUser = (userToUpdate: User) => {

        /*  Firebase old method    */
        firebase.firestore().collection("users").doc(location.state.id).update(userToUpdate)
            .then(() => {
                console.log("user updated sucessfully");
                navigate("/userList");
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />
                <UserForm onSubmit={updateUser} initialUserData={initialUserData} />
            </main>
        </>
    );
}

export default EditUser;
