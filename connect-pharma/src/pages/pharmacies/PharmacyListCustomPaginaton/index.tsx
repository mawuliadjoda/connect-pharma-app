import { useOutletContext } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Pharmacy, PharmacyConverter } from "../Pharmacy";
import { db } from "../../../services/db";
import Navbar from './../../../components/Navbar/Index';
import { Loading } from "../../../utils/Loading";
import PharmacyTable from "../PharmacyTable/PharmacyTable";
import { customPaginate } from "../util/PaginateCalculator";
import CustomPaginator from "./CustomPaginator";


const LIMIT_PER_PAGE = 10;

const PharmacyListCustomPaginaton = () => {
    const [sidebarToggle] = useOutletContext<any>();
    const [loading, setLoading] = useState(true);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [allPharmacies, setAllPharmacies] = useState<Pharmacy[]>([]);
    const [pharmaciesMap, setPharmaciesMap] = useState<Map<number, Pharmacy[]>>();
    const [page, setPage] = useState(1);

    const [disableNextButton, setDisableNextButton] = useState(true);
    const [disablePreviousButton, setDisablePreviousButton] = useState(true);


    const filteredPharmacies = useMemo(() => {
        return allPharmacies.map(pharmacy => pharmacy).filter(pharmacy => {
            return pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    }, [allPharmacies, searchQuery]);


    useEffect(() => {

        const usersRef = collection(db, 'pharmacies');
        const q = query(usersRef, where("name", "!=", null), orderBy("name", "asc"), limit(50));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const buildPharmacies: Pharmacy[] = [];
            querySnapshot.forEach((doc) => {
                const item = PharmacyConverter.fromFirestore(doc);
                buildPharmacies.push(item);
            });

            setAllPharmacies(buildPharmacies);

            const pharmaciesMap = customPaginate(buildPharmacies, LIMIT_PER_PAGE);
            setPharmaciesMap(pharmaciesMap);

            setPage(1);
            setPharmacies(pharmaciesMap?.get(page) as Pharmacy[]);

            querySnapshot.size < LIMIT_PER_PAGE ? setDisableNextButton(true) : setDisableNextButton(false);
            setDisablePreviousButton(true);

            setLoading(false);
        },

            (error) => {
                console.log(error);
            }

        );
        return () => unsubscribe();

    }, []);


    const getNext = () => {

        setDisableNextButton(true);
        if (pharmaciesMap?.get(page + 1)) {
            setDisableNextButton(false);
            setPage(page + 1);
            setPharmacies(pharmaciesMap?.get(page + 1) as Pharmacy[]);
        }
        setDisablePreviousButton(false);
    }

    const getPrevious = () => {

        setDisablePreviousButton(true);
        if (pharmaciesMap?.get(page - 1)) {
            setDisablePreviousButton(false);
            setPage(page - 1);
            setPharmacies(pharmaciesMap?.get(page - 1) as Pharmacy[]);
        }

        setDisableNextButton(false);
    }

    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />

                {loading && <Loading />}

                <div className="mainCard">
                    <button className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm" >
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

                        <PharmacyTable
                            loading={loading}
                            dataHeader={dataHeader}
                            data={searchQuery ? filteredPharmacies : pharmacies}
                            isClient={false}
                        />
                        {
                            !searchQuery &&
                            <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md grid place-items-center ">

                                <CustomPaginator
                                    getNext={getNext}
                                    getPrevious={getPrevious}
                                    page={page}
                                    disableNextButton={disableNextButton}
                                    disablePreviousButton={disablePreviousButton}

                                />
                            </div>
                        }

                    </div>

                </div>
            </main>
        </>
    );
};

export default PharmacyListCustomPaginaton;



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