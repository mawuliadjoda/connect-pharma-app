import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Index";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import UserTable from "./UserTable";
import firebase from './../firebase';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';



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

    /*   Firebase v9    */
    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("name", "!=", null));


    getDocs(q).then((querySnapshot) => {
      const newUsers = [];
      querySnapshot.forEach((doc) => {
        const item = {
          id: doc.id,
          ...doc.data()
        };
        newUsers.push(item);
      });
      console.log(newUsers);
      setUsers(newUsers);
    }).catch((error) => {
      console.error("Error getting documents: ", error);
    })

    /*  Firebase old method
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .onSnapshot(snapshot => {
        const newUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(newUsers);
      });
    return () => unsubscribe();
    */

  }, []);


  const addUser = () => {
    navigate("/addUser");
  };

  const handleDelete = (id) => {
    /*   Firebase v9   */
    const db = getFirestore();
    deleteDoc(doc(db, "users", id))
      .then(() => {
        console.log("user deleted sucessfully");
        setUsers(prev => {
          return prev.filter(user => user.id !== id);
        })
      })
      .catch(error => {
        console.error(error);
      });

 
      /*
    firebase.firestore().collection("users").doc(id).delete()
      .then(() => {
        console.log("user deleted sucessfully");
      })
      .catch(error => {
        console.error(error);
      });
    */
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
