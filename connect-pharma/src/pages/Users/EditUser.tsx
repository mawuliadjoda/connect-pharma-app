import { FormEvent, useRef} from "react";
import Navbar from "../../components/Navbar/Index";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import firebase from '../../firebase';
import { User } from "./AddUser";


function EditUser() {
    const location = useLocation();
    const navigate = useNavigate();

    const [sidebarToggle] = useOutletContext<any>();
    const initialFormState = location.state;

    const nameRef = useRef<HTMLInputElement>(initialFormState.name);
    const userNameRef = useRef<HTMLInputElement>(initialFormState.username);
    const emailRef = useRef<HTMLInputElement>(initialFormState.email);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const updatedUser = {
            id: initialFormState.id,        
            name: nameRef.current!.value,
            username: userNameRef.current!.value,
            email: emailRef.current!.value,
            roles: initialFormState.roles,
        }
        updateUser(updatedUser);
        

    }

    const updateUser = (userToUpdate: User) => {

   
        
       
        /*   Firebase v9    
        const userRef = doc(getDb(), "users", userToUpdate.id);
        updateDoc(userRef, {
            name: userToUpdate.name,
            username: userToUpdate.username,
            email: userToUpdate.email
        })
            .then(() => {
                console.log("user updated sucessfully");
                navigate("/table");
            })
            .catch((error) => {
                console.log("Error updating document:", error);
            });
        */

        /*  Firebase old method    */
        firebase.firestore().collection("users").doc(userToUpdate.id).update(userToUpdate)
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

                <div className="mainCard">
                    <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="text-sm text-gray-600">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                    placeholder="Name"
                                    ref={nameRef}
                                    required
                                    defaultValue={initialFormState.name}

                                />
                            </div>

                            <div>
                                <label htmlFor="username" className="text-sm text-gray-600">
                                    User name
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                    placeholder="username"
                                    ref={userNameRef}
                                    required
                                    defaultValue={initialFormState.username}

                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="text-sm text-gray-600">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                    placeholder="email"
                                    ref={emailRef}
                                    required
                                    defaultValue={initialFormState.email}

                                />
                            </div>

                            <div className="mt-6 flex flex-row gap-4">
                                <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default EditUser;
