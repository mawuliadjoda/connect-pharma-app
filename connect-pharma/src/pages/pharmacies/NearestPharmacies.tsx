import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pharmacy } from "./Pharmacy";
import { Loading } from "../../utils/Loading";
import PharmacyTable from "./PharmacyTable";
import Navbar from "../../components/Navbar/Index";
import { applyHaversine, getNearPharmacies } from "../../services/LocationService";
import { Coordinate } from "calculate-distance-between-coordinates";
import { convertToENecimal } from "../../utils/Utils";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getDb } from "../../services/db";


// https://gps-coordinates.org/my-location.php
/*
const USER_LOCATION: Coordinate = {    
    lat: 6.2469878,
    lon: 1.1449074
};
*/

export default function NearestPharmacies() {
    const [sidebarToggle] = useOutletContext<any>();
    const [loading, setLoading] = useState(true);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

    const { latitude, longitude } = useParams();



    useEffect(() => {

        const latitudeNumber: number = convertToENecimal(latitude);
        const longitudeNumber: number = convertToENecimal(longitude);

        const userLocation: Coordinate = {
            lat: latitudeNumber.valueOf(),
            lon: longitudeNumber.valueOf()
        }

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

            const haversinePharmacies = applyHaversine(newPharmacies, userLocation);
            const pharmaciesWithDistance = getNearPharmacies(haversinePharmacies);


            setPharmacies(pharmaciesWithDistance);
            setLoading(false);
        },

            (error) => {
                console.log(error);
            }

        );
        return () => unsubscribe();


    }, []);


    // https://signal.me/#p/+41794997040
    const openWhatsapp = (tel: string) => {
        const url = 'https://wa.me/+' + tel;
        console.log(url);
        window.open(url);
    }

    const openTelegram = (tel: string) => {
        const url = 'https://t.me/+' + tel;
        console.log(url);
        window.open(url);
    }

    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />

                {loading && <Loading />}

                <div className="mainCard">
                    <button
                        className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
                        Pharmacies Proches
                    </button>


                    <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                        <PharmacyTable
                            loading={loading}
                            dataHeader={dataHeader}
                            data={pharmacies}
                            showDistance={true}
                            openWhatsapp={openWhatsapp}
                            openTelegram={openTelegram}
                        />
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
        key: "distance",
        label: "Distance",
    },
    {
        key: "action",
        label: "Action",
    }
];