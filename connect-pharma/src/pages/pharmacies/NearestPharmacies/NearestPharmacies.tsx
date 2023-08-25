import { useParams } from "react-router-dom";
import {
    useEffect,
    useState,
    useMemo
} from "react";
import { Pharmacy, PharmacyConverter } from "../Pharmacy";
import { Loading } from "../../../utils/Loading";
import PharmacyTable from "../PharmacyTable";
// import Navbar from "../../components/Navbar/Index";
import { applyHaversine, getNearPharmacies } from "../../../services/LocationService";
import { Coordinate } from "calculate-distance-between-coordinates";
import { convertToENecimal, formatPhoneNumber, formatToSimpleDateWithSeconds } from "../../../utils/Utils";
import { GeoPoint, Timestamp, addDoc, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getDb } from "../../../services/db";
import { customPaginate } from "../util/PaginateCalculator";
import { ClientAction, ClientHistory } from "../../ClientHistory/ClientHistory";
import NearestPaginator from "./NearestPaginator";



// https://gps-coordinates.org/my-location.php
/*
const USER_LOCATION: Coordinate = {    
    lat: 6.2469878,
    lon: 1.1449074
};
*/

const LIMIT_PER_PAGE = 10;
export default function NearestPharmacies() {
    // const [sidebarToggle] = useOutletContext<any>();
    const [loading, setLoading] = useState(true);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [pharmaciesMap, setPharmaciesMap] = useState<Map<number, Pharmacy[]>>();
    const [allPharmacies, setAllPharmacies] = useState<Pharmacy[]>([]);

    const { latitude, longitude, userTelephone } = useParams();

    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [disableNextButton, setDisableNextButton] = useState(false);
    const [disablePreviousButton, setDisablePreviousButton] = useState(true);


    const filteredPharmacies = useMemo(() => {
        return allPharmacies.map(pharmacy => pharmacy).filter(pharmacy => {
            return pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    }, [allPharmacies, searchQuery]);


    // const latitudeNumber: number =  convertToENecimal(latitude);
    // const longitudeNumber: number = convertToENecimal(longitude);
    
    
    const latitudeNumber: number =  useMemo( () => {
        return convertToENecimal(latitude);
    }, [latitude]);

    const longitudeNumber: number = useMemo( () => {
        return convertToENecimal(longitude);
    }, [longitude]);
    

    useEffect(() => {
        setLoading(true);

        const userLocation: Coordinate = {
            lat: latitudeNumber.valueOf(),
            lon: longitudeNumber.valueOf()
        }

        const usersRef = collection(getDb(), 'pharmacies');
        const q = query(usersRef, where("name", "!=", null), orderBy("name", "asc"), limit(50));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const newPharmacies: Pharmacy[] = [];
            querySnapshot.forEach((doc) => newPharmacies.push(PharmacyConverter.fromFirestore(doc)));

            const haversinePharmacies = applyHaversine(newPharmacies, userLocation);
            const pharmaciesWithDistance = getNearPharmacies(haversinePharmacies);

            setAllPharmacies(pharmaciesWithDistance);

            const customPharmaciesMap = customPaginate(pharmaciesWithDistance, LIMIT_PER_PAGE);


            setLoading(false);
            setPage(1);

            setPharmaciesMap(customPharmaciesMap);
            setPharmacies(customPharmaciesMap?.get(page) as Pharmacy[]);
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
        console.log(disablePreviousButton);
    }

    // https://signal.me/#p/+41794997040
    const openWhatsapp = (pharmacy: Pharmacy) => {
        const url = `https://wa.me/${formatPhoneNumber(pharmacy.tel)}`;
        window.open(url);

        const clientHistory: ClientHistory = {
            clientPhoneNumber: formatPhoneNumber(userTelephone!),
            pharmacyPhoneNumber: formatPhoneNumber(pharmacy.tel),
            pharmacyEmail: pharmacy.email,
            pharmacyName: pharmacy.name,
            clientLocation: new GeoPoint(latitudeNumber, longitudeNumber),
            pharmacyLocation: pharmacy.location,
            createTime: Timestamp.now(),
            createTimeFormat: formatToSimpleDateWithSeconds(Timestamp.now().toDate()),
            action: ClientAction.CLICK_WHATSAPP
        }
        addClientHistory(clientHistory);
    }

    const openTelegram = (pharmacy: Pharmacy) => {

        const url = `https://t.me/${formatPhoneNumber(pharmacy.tel)}`;
        window.open(url);

        const clientHistory: ClientHistory = {
            clientPhoneNumber: formatPhoneNumber(userTelephone!),
            pharmacyPhoneNumber: formatPhoneNumber(pharmacy.tel),
            pharmacyEmail: pharmacy.email,
            pharmacyName: pharmacy.name,
            clientLocation: new GeoPoint(latitudeNumber, longitudeNumber),
            pharmacyLocation: pharmacy.location,
            createTime: Timestamp.now(),
            createTimeFormat: formatToSimpleDateWithSeconds(Timestamp.now().toDate()),
            action: ClientAction.CLICK_TELEGRAM
        }
        addClientHistory(clientHistory);
    }

    const openMag = (pharmacy: Pharmacy) => {
        const url = `https://www.google.com/maps/dir//${pharmacy.location.latitude},${pharmacy.location.longitude}`;
        window.open(url);

        const clientHistory: ClientHistory = {
            clientPhoneNumber: formatPhoneNumber(userTelephone!),
            pharmacyPhoneNumber: formatPhoneNumber(pharmacy.tel!),
            pharmacyEmail: pharmacy.email,
            pharmacyName: pharmacy.name,
            
            clientLocation: new GeoPoint(latitudeNumber, longitudeNumber),
            pharmacyLocation: pharmacy.location,

            createTime: Timestamp.now(),
            createTimeFormat: formatToSimpleDateWithSeconds(Timestamp.now().toDate()),
            action: ClientAction.CLICK_MAP
        }
        addClientHistory(clientHistory);
    }


    const addClientHistory = (clientHistory: ClientHistory) => {
        const clientHistoriesRef = collection(getDb(), 'clientHistories');
        addDoc(clientHistoriesRef, clientHistory)
            .then(() => {
                console.log("client added sucessfuly !");
            })
            .catch((error) => {
                console.log("Error adding client:", error);
            });
    }



    return (
        <>
            <main className="h-full">
                {/* <Navbar toggle={sidebarToggle} /> */}

                {loading ?

                    <Loading /> :

                    <div className="mainCard">
                        <button
                            className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
                            Pharmacies Proches
                        </button>

                        <br />
                        <br />
                        {
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
                        }


                        <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                            <PharmacyTable
                                loading={loading}
                                dataHeader={dataHeader}
                                data={searchQuery ? filteredPharmacies : pharmacies}
                                isClient={true}
                                openWhatsapp={openWhatsapp}
                                openTelegram={openTelegram}
                                openMag={openMag}
                            />
                        </div>

                        {
                            !searchQuery &&
                            <div>
                                <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md grid place-items-center ">
                                    <NearestPaginator
                                        getNext={getNext}
                                        getPrevious={getPrevious}
                                        page={page}
                                        disableNextButton={disableNextButton}
                                        disablePreviousButton={disablePreviousButton}
                                    />
                                </div>
                                <br />
                                <br />
                                <br />
                            </div>
                        }

                    </div>
                }


            </main>
        </>
    )
}


const dataHeader = [
    {
        key: "name",
        label: "Nom",
    },
    // {
    //     key: "tel",
    //     label: "Tel",
    // },
    // {
    //     key: "email",
    //     label: "Email",
    // },
    {
        key: "distance",
        label: "Distance",
    },
    {
        key: "action",
        label: "Action",
    }
];