import {
    useEffect,
    useState,
    useMemo
} from "react";
import { Pharmacy, PharmacyConverter } from "../Pharmacy";
import { Loading } from "../../../components/Loading/Loading";
// import PharmacyTable from "../PharmacyTable/PharmacyTable";
// import Navbar from "../../components/Navbar/Index";
import { applyHaversine, getNearPharmacies } from "../../../services/LocationService";
import { Coordinate } from "calculate-distance-between-coordinates";
import { formatPhoneNumber, formatToSimpleDateWithSeconds } from "../../../utils/Utils";
import { GeoPoint, Timestamp, addDoc, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getDb } from "../../../services/db";
import { customPaginate } from "../util/PaginateCalculator";
import { ClientAction, ClientHistory } from "../../ClientHistory/ClientHistory";
import NearestPaginator from "./NearestPaginator";

import Fuse from "fuse.js";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CardAnimation from './../CardAnimation/CardAnimation';



// https://gps-coordinates.org/my-location.php
/*
const USER_LOCATION: Coordinate = {    
    lat: 6.2469878,
    lon: 1.1449074
};
*/
const clientStartMessage = `Bonjour je vous contact concernant les médicaments suivants: \nJe vous envoie une capture de l'ordonnance`;
const unexpectedWordInSearchQuery = 'pharmacie';
const LIMIT_PER_PAGE = 10;


type NearestPharmaciesProps = {
    latitude: number,
    longitude: number,
    userTelephone: string
}
export default function NearestPharmacies({ latitude, longitude, userTelephone }: NearestPharmaciesProps) {
    // const [sidebarToggle] = useOutletContext<any>();
    const [loading, setLoading] = useState(true);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [pharmaciesMap, setPharmaciesMap] = useState<Map<number, Pharmacy[]>>();
    const [allPharmacies, setAllPharmacies] = useState<Pharmacy[]>([]);

    // const { latitude, longitude, userTelephone } = useParams();

    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [disableNextButton, setDisableNextButton] = useState(false);
    const [disablePreviousButton, setDisablePreviousButton] = useState(true);
    const [isProbablyNetworkError, setIsProbablyNetworkError] = useState(false);


    /*
    const filteredPharmacies = useMemo(() => {
        return allPharmacies.map(pharmacy => pharmacy).filter(pharmacy => {
            return pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    }, [allPharmacies, searchQuery]);
    */

    // https://www.fusejs.io/demo.html
    const filteredPharmacies = useMemo(() => {

        const search = searchQuery.toLowerCase().includes(unexpectedWordInSearchQuery) ? searchQuery.toLowerCase().replace(unexpectedWordInSearchQuery, '') : searchQuery

        const fuseOptions = {
            // isCaseSensitive: false,
            // includeScore: false,
            shouldSort: true,
            // includeMatches: false,
            // findAllMatches: false,
            // minMatchCharLength: 1,
            // location: 0,
            // threshold: 0.6,
            // distance: 100,
            // useExtendedSearch: false,
            // ignoreLocation: false,
            // ignoreFieldNorm: false,
            // fieldNormWeight: 1,
            keys: [
                "name",
            ]
        };
        const fuse = new Fuse(allPharmacies, fuseOptions);
        const result = fuse.search(search).map(line => line.item);
        return result;

    }, [allPharmacies, searchQuery]);


    /*
    const latitude: number = useMemo(() => {
        return convertToENecimal(latitude);
    }, [latitude]);

    const longitude: number = useMemo(() => {
        return convertToENecimal(longitude);
    }, [longitude]);
    */


    useEffect(() => {
        setLoading(true);
        setIsProbablyNetworkError(false);
        const userLocation: Coordinate = {
            lat: latitude,
            lon: longitude
        }

        const usersRef = collection(getDb(), 'pharmacies');
        const q = query(usersRef, where("name", "!=", null), orderBy("name", "asc"), limit(50));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            if (querySnapshot.size > 0) {

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

                setIsProbablyNetworkError(false);

            } else {
                setLoading(true);
                setIsProbablyNetworkError(true);
            }
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

    // https://signal.me/#p/+41794997040
    const openWhatsapp = (pharmacy: Pharmacy) => {
        window.open(`https://api.whatsapp.com/send?phone=${formatPhoneNumber(pharmacy.tel)}&text=${encodeURIComponent(clientStartMessage)}`);
        handleAddClientHistory(pharmacy, ClientAction.CLICK_WHATSAPP);
    }

    const openTelegram = (pharmacy: Pharmacy) => {
        window.open(`https://t.me/${formatPhoneNumber(pharmacy.tel)}`);
        handleAddClientHistory(pharmacy, ClientAction.CLICK_TELEGRAM);
    }

    const openMag = (pharmacy: Pharmacy) => {
        window.open(`https://www.google.com/maps/dir//${pharmacy.location.latitude},${pharmacy.location.longitude}`);
        handleAddClientHistory(pharmacy, ClientAction.CLICK_MAP);
    }

    const openPhone = (pharmacy: Pharmacy) => {
        window.open(`tel:${formatPhoneNumber(pharmacy.tel)}`);
        handleAddClientHistory(pharmacy, ClientAction.CLIK_PHONE);
    }

    const handleAddClientHistory = (pharmacy: Pharmacy, action: ClientAction) => {
        const clientHistory: ClientHistory = {
            clientPhoneNumber: formatPhoneNumber(userTelephone!),
            pharmacyPhoneNumber: formatPhoneNumber(pharmacy.tel!),
            pharmacyEmail: pharmacy.email,
            pharmacyName: pharmacy.name,

            clientLocation: new GeoPoint(latitude, longitude),
            pharmacyLocation: pharmacy.location,

            createTime: Timestamp.now(),
            createTimeFormat: formatToSimpleDateWithSeconds(Timestamp.now().toDate()),
            action: action
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

                {
                    loading

                        ?
                        <div className="mainCard">
                            <Loading
                                message="Moteur de calcul en cours d'exécution ..."
                                isForClient={true}
                                isProbablyNetworkError={isProbablyNetworkError}
                            />
                        </div>


                        :
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
                                        <SearchBar setSearchQuery={setSearchQuery} />
                                    </div>
                                </form>
                            }


                            {/* <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md"> */}
                            <div className="border w-full">
                                {/* <PharmacyTable
                                    loading={loading}
                                    dataHeader={dataHeader}
                                    data={searchQuery ? filteredPharmacies : pharmacies}
                                    isClient={true}
                                    openWhatsapp={openWhatsapp}
                                    openTelegram={openTelegram}
                                    openMag={openMag}
                                /> */}
                                <CardAnimation
                                    data={searchQuery ? filteredPharmacies : pharmacies}
                                    openWhatsapp={openWhatsapp}
                                    openTelegram={openTelegram}
                                    openMag={openMag}
                                    openPhone={openPhone}
                                />
                            </div>

                            {
                                !searchQuery &&
                                <div>
                                    <br />
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


/*
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
*/