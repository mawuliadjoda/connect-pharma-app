import React, { useState } from "react";
import Navbar from "../components/Navbar/Index";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import firebase from './../firebase';


function EditUser() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [sidebarToggle] = useOutletContext();
    const initialFormState = location.state;
    const [user, setUser] = useState(initialFormState);


    const handleInputChange = (event) => {
        const { name, value } = event.target
    
        setUser({ ...user, [name]: value })
    }

    const updateUser = (updatedUser) => {
    
        firebase.firestore().collection("users").doc(updatedUser.id).update({
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email
        })
        .then(() => {
            console.log("user updated sucessfully");
            navigate("/table");
        })
        .catch((error) => {
            console.error(error);
        });
    
    }
   

    return (
        <>
        <main className="h-full">
            <Navbar toggle={sidebarToggle} />

            {/* Main Content */}
            <div className="mainCard">
                <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        if (!user.name || !user.username) return

                        updateUser(user);
                        setUser(user);
                    }}>
                        {/* Form Default */}
                        <div>
                            <label htmlFor="name" className="text-sm text-gray-600">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                // onChange={(e) => setEmail(e.target.value)}
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="Name"
                                value={user.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Form Large */}
                        <div className="mt-6">
                            <label htmlFor="username" className="text-sm text-gray-600">
                                User name
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                // onChange={(e) => setEmail(e.target.value)}
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="User name"
                                value={user.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* With Icon */}
                        <div className="mt-6 relative">
                            <label
                                htmlFor="email"
                                className="text-sm text-gray-600"
                            >
                                Email
                            </label>

                            <div className="inline-flex items-center justify-center absolute left-0 top-[0.85rem] h-full w-10 text-gray-400">
                                <FontAwesomeIcon icon={faAt} />
                            </div>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                // onChange={(e) => setEmail(e.target.value)}
                                className="text-sm placeholder-gray-500 pl-10 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="Email"
                                value={user.email}
                                onChange={handleInputChange}
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
