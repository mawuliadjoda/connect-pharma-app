import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar/Index";
import { Pharmacy } from "./Pharmacy";
import { GeoPoint, addDoc, collection } from "firebase/firestore";
import { getDb } from "../../services/db";
import PharmacyForm from "./PharmacyForm";
import { convertToENecimal } from "../../utils/Utils";
import { useEffect, useState } from "react";


export {};

declare global {
  interface Window {
    Telegram: any; // 👈️ turn off type checking
  }
}

const tele = window.Telegram.WebApp;

export default function AddPharmacy() {
    // const [sidebarToggle] = useOutletContext<any>();
    const [isLoading, setIsLoading] = useState(false);

    const { latitude, longitude, userTelephone } = useParams();
    const navigate = useNavigate();


    const latitudeNumber: number = convertToENecimal(latitude);
    const longitudeNumber: number = convertToENecimal(longitude);

    const initialPharmacyData: Pharmacy = {
        address: '',
        email: '',
        isActive: false,
        location: new GeoPoint(latitudeNumber, longitudeNumber),
        name: '',
        tel: userTelephone ? userTelephone : '',
    }


    useEffect(() => {
        tele.ready();
    });

    const addPharmacy = (pharmacy: Pharmacy) => {
        console.log(userTelephone);
        /*   Firebase v9    */
        const pharmaciesRef = collection(getDb(), 'pharmacies');
        setIsLoading(true);
        addDoc(pharmaciesRef, pharmacy)
            .then(() => {
                setIsLoading(false);
                navigate(`/nearestPharmacies/${latitude}/${longitude}/${userTelephone}`);
                console.log("Data sucessfuly submitted");

                tele.sendData('Votre pharmacie a été bien enregistrer dans notre système ! ');

            })
            .catch((error) => {
                console.log("Error adding document:", error);
            });
    }

    return (
        <>
            <main className="h-full">
                {/* <Navbar toggle={sidebarToggle} />  */}
                <div className="mainCard">
                    <button
                        className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
                        Ajout de pharmacie
                    </button>
                    <PharmacyForm onSubmit={addPharmacy} initialPharmacyData={initialPharmacyData} isLoading={isLoading} />
                </div>
            </main>
        </>
    )
}