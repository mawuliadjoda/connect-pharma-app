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
                navigate("/pharmacies");
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
                <PharmacyForm onSubmit={addPharmacy} initialPharmacyData={initialPharmacyData} />
            </main>
        </>
    )
}