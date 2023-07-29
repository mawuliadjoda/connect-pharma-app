import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Index";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import UserTable from "./UserTable";
import firebase from './../firebase';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Table = () => {
  const navigate = useNavigate();
  const [sidebarToggle] = useOutletContext();

  const [loading] = useState(false);

  const [users, setUsers] = useState([]);

  const dataHeader = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "action",
      label: "Action",
    },
  ];


  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .onSnapshot(snapshot => {
        const newUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // console.log(newUsers);
        setUsers(newUsers);
      });
    return () => unsubscribe();
  }, []);


  const addUser = () => {
    navigate("/addUser");
  };

  const handleDelete = (id) => { 
    console.log(id);
    firebase.firestore().collection("users").doc(id).delete()
    .then(() => {
      console.log("user deleted sucessfully");
    })
    .catch(error => {
      console.error(error);
    });
  };


  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">

          {/* Add user Button */}
          <button
            className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm"
            onClick={() => addUser()}>
            <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Add User
          </button>

          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
            <UserTable
              loading={loading}
              dataHeader={dataHeader}
              data={users}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Table;
