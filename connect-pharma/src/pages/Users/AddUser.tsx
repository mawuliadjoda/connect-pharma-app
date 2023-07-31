import { FormEvent, useRef } from "react";
import Navbar from "../../components/Navbar/Index";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { getDb } from "../../services/db";


export type User = {
    id?: string,
    name: string,
    username: string,
    email?: string,
    roles?: string[]
}

function AddUser() {
    const [sidebarToggle] = useOutletContext<any>();
    const initialFormState = { id: null, name: '', username: '', email: '' }

    const nameRef = useRef<HTMLInputElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();



    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        addUser({
            name: nameRef.current!.value,
            username: userNameRef.current!.value,
            email: emailRef.current!.value
        });

    }

    const addUser = (user: User) => {

        const data = {
            name: user.name,
            username: user.username,
            email: user.email,
            roles: ["user"]
        }

        /*   Firebase v9    */
        const usersRef = collection(getDb(), 'users');
        addDoc(usersRef, data)
            .then(() => {
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

export default AddUser;
