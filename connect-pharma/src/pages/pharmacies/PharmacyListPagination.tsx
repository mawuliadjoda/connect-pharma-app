import { useOutletContext } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Pharmacy, PharmacyConverter } from "./Pharmacy";
import {
    collection, endBefore,
    limit,
    limitToLast,
    onSnapshot,
    orderBy,
    query,
    // startAfter, 
    startAt,
    // where 
} from "firebase/firestore";
import { db } from "../../services/db";
import { Loading } from "../../utils/Loading";
import PharmacyTable from "./PharmacyTable";
import Navbar from "../../components/Navbar/Index";
import PharmacyPagination from "./util/PharmacyPagination";


// https://gist.github.com/joeljerushan/e931f5ee4a4ab3664bbd47d1b06b7264


const LIMIT_PER_PAGE = 10;
export default function PharmacyList() {
    const [sidebarToggle] = useOutletContext<any>();
    const [loading, setLoading] = useState(true);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // const [list, setList] = useState([]);
    const [page, setPage] = useState(1);


    const filteredPharmacies = useMemo(() => {
        return pharmacies.map(pharmacy => pharmacy).filter(pharmacy => {
            return pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    }, [pharmacies, searchQuery]);

    useEffect(() => {

        setLoading(true);
        const q = query(collection(db, 'pharmacies'),
            // where("name", "!=", null), 
            // orderBy("name", "asc"), 

            orderBy("name", "asc"),
            limit(LIMIT_PER_PAGE)
        );

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

    const getNext = (item: Pharmacy) => {

        setLoading(true);
        if (pharmacies.length === 0) {
            alert("Thats all we have for now !");
            setLoading(false);
        } else {

            const q = query(collection(db, 'pharmacies'),
                // where("name", "!=", null), 
                orderBy("name", "asc"),

                startAt(item.name),
                // orderBy("name", "asc"), 
                // startAfter(item.id),
                limit(LIMIT_PER_PAGE),

            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const newPharmacies: Pharmacy[] = [];
                querySnapshot.forEach((doc) => {
                    const item = PharmacyConverter.fromFirestore(doc);
                    newPharmacies.push(item);
                });
                setPharmacies(newPharmacies);
                setLoading(false);

                // setList(items);
                setPage(page + 1)
            },
                (error) => {
                    console.log(error);
                }
            );
            return () => unsubscribe();
        }
    };




    const getPrevious = (item: Pharmacy) => {
        if (!item) return;
        setLoading(true);
        const q = query(collection(db, 'pharmacies'),
            // where("name", "!=", null), 
            // orderBy("name", "asc"), 
            // .endBefore(item.id)

            orderBy("name", "asc"),

            endBefore(item.name),
            limitToLast(LIMIT_PER_PAGE)

        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newPharmacies: Pharmacy[] = [];
            querySnapshot.forEach((doc) => {
                const item = PharmacyConverter.fromFirestore(doc);
                newPharmacies.push(item);
            });
            if (querySnapshot.size > 0) {
                setPharmacies(newPharmacies);

                // setList(items);
                setPage(page - 1)
            }
            setLoading(false);

        }, (error) => { console.log(error); }

        );
        return () => unsubscribe();
    };

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
                    <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md grid place-items-center ">
                        <PharmacyPagination getNext={getNext} getPrevious={getPrevious} pharmacies={filteredPharmacies}  page={page} />
                    </div>

                </div>
            </main>
        </>
    )
}


const dataHeader = [
    {
        key: "name",
        label: "Nom",
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