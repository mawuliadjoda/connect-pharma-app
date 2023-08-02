import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pharmacy } from "./Pharmacy";
// import { GeoPoint, collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
// import { getDb } from "../../services/db";
import { Loading } from "../../utils/Loading";
import PharmacyTable from "./PharmacyTable";
import Navbar from "../../components/Navbar/Index";
import { getPharmacyData } from "../../services/FileService";
import { applyHaversine, getNearPharmacies } from "../../services/LocationService";
import { Coordinate } from "calculate-distance-between-coordinates";
import { convertToENecimal } from "../../utils/Utils";
import { GeoPoint } from "firebase/firestore";


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

        const latitudeNumber: Number = convertToENecimal(latitude);
        const longitudeNumber: Number = convertToENecimal(longitude);

        const userLocation: Coordinate = {
            lat: latitudeNumber.valueOf(),
            lon: longitudeNumber.valueOf()
        }

        const data = getPharmacyData();
        const pharmacyData = data.map(item => {
            const pharmacy: Pharmacy = {

                address: item.adresse,
                email: item.email,
                isActive: item.visible,
                location: new GeoPoint(item.lat, item.lng),
                name: item.label,
                tel: item.tel
            }
            return pharmacy;
        })

        console.log(pharmacyData);

        const haversinePharmacies = applyHaversine(pharmacyData, userLocation);
        const pharmaciesWithDistance = getNearPharmacies(haversinePharmacies);

        setPharmacies(pharmaciesWithDistance);
        setLoading(false);

        /*    
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
                setLoading(false);
            },
    
                (error) => {
                    console.log(error);
                }
    
            );
            return () => unsubscribe();
        */

    }, []);


    const openWhatsapp = (tel: string) => {
        const url = 'https://wa.me/' + tel;
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
                        className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm"
                    // onClick={() => AddPharmacy()}
                    >
                        Pharmacy List
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