import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Index";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserTable from "./UserTable";

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { getDb } from "../../services/db";
import { User } from "./AddUser";




const Table = () => {
  const navigate = useNavigate();
  const [sidebarToggle] = useOutletContext<any>();

  const [loading] = useState(false);

  const [users, setUsers] = useState<User[]>([]);

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
    // const db = getFirestore();
    const usersRef = collection(getDb(), 'users');

    /*   Use paginate later  onSnapshot() equivalent de hooks
     https://firebase.google.com/docs/firestore/query-data/listen?hl=fr
     https://firebase.google.com/docs/firestore/query-data/query-cursors?hl=fr#paginate_a_query
     https://firebase.google.com/docs/firestore/manage-data/transactions?hl=fr
     */
    const q = query(usersRef, where("name", "!=", null), orderBy("name", "asc"), limit(50));


    /*
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
    */


    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newUsers: User[] = [];
      querySnapshot.forEach((doc) => {
        const item = {
          id: doc.id,
          name: doc.data().name,
          username: doc.data().username,
          email: doc.data().email,
          roles: doc.data().roles
        };
        newUsers.push(item);
      });
      console.log(newUsers);
      setUsers(newUsers);
    },

      (error) => {
        console.log(error);
      }

    );
    return () => unsubscribe();
    // return unsubscribe();

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

  const handleDelete = (id: string) => {
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
