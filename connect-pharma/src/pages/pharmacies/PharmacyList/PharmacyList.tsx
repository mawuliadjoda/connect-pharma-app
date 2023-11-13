import { useOutletContext } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Pharmacy, PharmacyConverter } from "../Pharmacy";
import { 
    collection, 
    // limit, 
    onSnapshot, orderBy, query, where 
} from "firebase/firestore";
import { getDb } from "../../../services/db";
import { Loading } from "../../../components/Loading/Loading";
import PharmacyTable from "../PharmacyTable/PharmacyTable";
import Navbar from "../../../components/Navbar/Index";



export default function PharmacyList() {
    const [sidebarToggle] = useOutletContext<any>();
    const [loading, setLoading] = useState(true);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPharmacies = useMemo(() => {
        return pharmacies.map(pharmacy => pharmacy).filter(pharmacy => {
            return pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    }, [pharmacies, searchQuery]);


    useEffect(() => {
        
        const pharmaciesRef = collection(getDb(), 'pharmacies');
        // const q = query(pharmaciesRef, where("name", "!=", null), orderBy("name", "asc"), limit(50));
        const q = query(pharmaciesRef, where("name", "!=", null), orderBy("name", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newPharmacies: Pharmacy[] = [];
            querySnapshot.forEach((doc) => {
                const item = PharmacyConverter.fromFirestore(doc);
                newPharmacies.push(item);
            });
            setPharmacies(newPharmacies);
            setLoading(false);
        },

            (error) => {
                console.log(error);
            }

        );
        return () => unsubscribe();

    }, []);


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
                        <PharmacyTable loading={loading} dataHeader={dataHeader} data={filteredPharmacies} isClient={false} />
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