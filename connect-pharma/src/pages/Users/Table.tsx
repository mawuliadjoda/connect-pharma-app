import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Index";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserTable from "./UserTable";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { getDb } from "../../services/db";
import { User, UserConverter } from "./User";
import { Loading } from "../../components/Loading/Loading";


const Table = () => {
  const navigate = useNavigate();
  const [sidebarToggle] = useOutletContext<any>();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {

    /*   Firebase v9    */
    const usersRef = collection(getDb(), 'users');

    /*   Use paginate later  onSnapshot() equivalent de hooks
     https://firebase.google.com/docs/firestore/query-data/listen?hl=fr
     https://firebase.google.com/docs/firestore/query-data/query-cursors?hl=fr#paginate_a_query
     https://firebase.google.com/docs/firestore/manage-data/transactions?hl=fr
     */
    const q = query(usersRef, where("createTime", "!=", null), orderBy("createTime", "desc"), limit(50));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newUsers: User[] = [];
      querySnapshot.forEach((doc) => {
        const user = UserConverter.fromFirestore(doc);
        // const user = {id: doc.id, ...doc.data()} as User;
        newUsers.push(user);
      });
      setUsers(newUsers);
      setLoading(false);
    },

      (error) => {
        console.log(error);
      }

    );
    return () => unsubscribe();
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
          return prev.filter(user => user!.id !== id);
        })
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <>

      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {loading && <Loading />}

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