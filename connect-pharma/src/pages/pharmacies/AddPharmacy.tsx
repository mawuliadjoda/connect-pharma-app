import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Index";
import { Pharmacy } from "./Pharmacy";
import { GeoPoint, addDoc, collection } from "firebase/firestore";
import { getDb } from "../../services/db";
import PharmacyForm from "./PharmacyForm";
import { convertToENecimal } from "../../utils/Utils";


export default function AddPharmacy() {
    const [sidebarToggle] = useOutletContext<any>();
    // const [loading, setLoading] = useState(true);

    const { latitude, longitude } = useParams();
    const navigate = useNavigate();


    const latitudeNumber: number = convertToENecimal(latitude);
    const longitudeNumber: number = convertToENecimal(longitude);

    const initialPharmacyData: Pharmacy = {
        address: '',
        email: '',
        isActive: false,
        location: new GeoPoint(latitudeNumber, longitudeNumber),
        name: '',
        tel: '',
    }

    const addPharmacy = (pharmacy: Pharmacy) => {

        /*   Firebase v9    */
        const pharmaciesRef = collection(getDb(), 'pharmacies');
        addDoc(pharmaciesRef, pharmacy)
            .then(() => {
                navigate(`/nearestPharmacies/${latitude}/${longitude}`);
                console.log("Data sucessfuly submitted")
            })
            .catch((error) => {
                console.log("Error adding document:", error);
            });
    }

    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />
                <div className="mainCard">
                    <button
                        className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
                        Ajout de pharmacie
                    </button>
                    <PharmacyForm onSubmit={addPharmacy} initialPharmacyData={initialPharmacyData} />
                </div>
            </main>
        </>
    )
}