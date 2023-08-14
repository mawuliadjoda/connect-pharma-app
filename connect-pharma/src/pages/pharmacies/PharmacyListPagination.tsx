import { useOutletContext } from "react-router-dom";
import { useState, useMemo, useContext} from "react";
import { Pharmacy } from "./Pharmacy";
import { DocumentData, QueryDocumentSnapshot, collection,  orderBy, query } from "firebase/firestore";
import { getDb } from "../../services/db";
import { Loading } from "../../utils/Loading";
import PharmacyTable from "./PharmacyTable";
import Navbar from "../../components/Navbar/Index";
import { UserContext } from "../../utils/PrivateRoutes";
import usePagination from 'react-firebase-pagination';
import Pagination from "./util/Pagination";



const PharmacyConverter = {
    toFirestore: (pharmacy: Pharmacy) => {
        return {
            id: pharmacy.id,
            address: pharmacy.address,
            email: pharmacy.email,
            isActive: pharmacy.isActive,
            location: pharmacy.location,
            name:pharmacy.name,
            tel:pharmacy.tel,
            distance: pharmacy.distance,
            distanceStr: pharmacy.distanceStr
            };
    },
    fromFirestore: (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
    
        const pharmacy: Pharmacy = {
            id: doc.id,
            address: doc.data().address,
            email: doc.data().email,
            isActive: doc.data().isActive,
            location: doc.data().location,
            name:doc.data().name,
            tel:doc.data().tel,
            distance: doc.data().distance,
            distanceStr: doc.data().distanceStr
            }
        return pharmacy;
    }
};
export default function PharmacyList() {
    // const mainQuery = query(collection(getDb(), 'pharmacies'), orderBy('name', 'desc'));
    const mainQuery = query(collection(getDb(), 'pharmacies'), orderBy('name', 'desc'));
    const { getNext, getPrevious, data, loading } = usePagination({
        pageSize: 10,
        pageByPage: true,
        query: mainQuery,
    });


    const connectedUser = useContext(UserContext);
    const [sidebarToggle] = useOutletContext<any>();
    // const [loading, setLoading] = useState(true);
    // const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    console.log(connectedUser);
    // console.log(pharmacies);


    // const val = data.docs.map(doc => PharmacyConverter.fromFirestore(doc));
    const newPharmacies = data.docs.map(doc => PharmacyConverter.fromFirestore(doc));
    //setPharmacies(newPharmacies);


    const filteredPharmacies = useMemo(() => {
        return newPharmacies.map(pharmacy => pharmacy).filter(pharmacy => {
            return pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    }, [newPharmacies, searchQuery]);


    /*
    useEffect(() => {
        
        console.log(connectedUser);
        const usersRef = collection(getDb(), 'pharmacies');
        const q = query(usersRef, where("name", "!=", null), orderBy("name", "asc"), limit(50));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newPharmacies: Pharmacy[] = [];
            querySnapshot.forEach((doc) => {
                const item = {
                    id: doc.id,
                    address: doc.data().address,
                    email: doc.data().email,
                    isActive: doc.data().isActive,
                    location: doc.data().location,
                    name: doc.data().name,
                    tel: doc.data().tel
                };
                newPharmacies.push(item);
            });
            console.log(newPharmacies);
            setPharmacies(newPharmacies);
            // setLoading(false);
        },

            (error) => {
                console.log(error);
            }

        );
        return () => unsubscribe();
      

    }, []);
  */

    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />

                {loading && <Loading />}

                <div className="mainCard">
                    <button
                        className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm"
                    >
                        Pharmacy List
                    </button>

                    <form>
                        <div className="relative">

                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                type="search"
                                id="default-search"
                                className="mb-2 mt-2 text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="Search"
                                required />
                        </div>
                    </form>


                    <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                        <PharmacyTable loading={loading} dataHeader={dataHeader} data={filteredPharmacies} showDistance={false} />
                    </div>
                    <div className="grid place-items-center ">
                         <Pagination getNext={getNext}  getPrevious={getPrevious}/>
                    </div>
                </div>
            </main>
        </>
    )
}


const dataHeader = [
    {
        key: "name",
        label: "Name",
    },
    {
        key: "tel",
        label: "Tel",
    },
    {
        key: "email",
        label: "Email",
    },
    {
        key: "lat",
        label: "Latitude",
    },
    {
        key: "lng",
        label: "Longitude",
    },
];