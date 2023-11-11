import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar/Index";
import { Pharmacy } from "../Pharmacy";
import { GeoPoint, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, getDb } from "../../../services/db";
import PharmacyForm from "../PharmacyForm/PharmacyForm";
import {
    buildEmail,
    // convertToENecimal 
} from "../../../utils/Utils";
import { useEffect, useMemo, useState } from "react";
import { formatPhoneNumber } from '../../../utils/Utils';
import { WebAppData, WebAppDataStep } from "../../../utils/WebAppData";


export { };

declare global {
    interface Window {
        Telegram: any; // 👈️ turn off type checking
    }
}

const tele = window.Telegram.WebApp;

type AddPharmacyProps = {
    latitude: number,
    longitude: number,
    userTelephone: string
}
export default function AddPharmacy({ latitude, longitude, userTelephone }: AddPharmacyProps) {
    // const [sidebarToggle] = useOutletContext<any>();
    const [isLoading, setIsLoading] = useState(false);

    // const { latitude, longitude, userTelephone } = useParams();
    const navigate = useNavigate();


    /*
    const latitudeNumber: number | null = useMemo(() => {
        return latitude ? convertToENecimal(latitude) : null;
    }, [latitude]);

    const longitudeNumber: number | null = useMemo(() => {
        return longitude ? convertToENecimal(longitude) : null;
    }, [longitude]);
    */
    const [telErrorMsg, setTelErrorMsg] = useState<string | null>(null);
    const [emailErrorMsg, setEmailErrorMsg] = useState<string | null>(null);
    const [nameErrorMsg, setNameErrorMsg] = useState<string | null>(null);

    const initialPharmacyData: Pharmacy = useMemo(() => {
        return {
            address: '',
            email: '',
            isActive: false,
            location: new GeoPoint(latitude, longitude),
            name: '',
            tel: userTelephone ? formatPhoneNumber(userTelephone) : '',
        }
    }, [latitude, longitude, userTelephone]);




    useEffect(() => {
        tele.ready();
    });

    const addPharmacy = async (pharmacy: Pharmacy) => {
        console.log(userTelephone);
        /*   Firebase v9    */
        const pharmaciesRef = collection(getDb(), 'pharmacies');
        setIsLoading(true);

        let hasEmail: boolean = true;

        if (!pharmacy.email) {
            pharmacy.email = buildEmail(pharmacy.tel);
            hasEmail = false;
        }

        /*  check tel  */
        await checkExistPharmacy(pharmacy);
        /*   end check tel */


        addDoc(pharmaciesRef, pharmacy)
            .then(() => {
                setIsLoading(false);
                // navigate(`/nearestPharmacies/${latitude}/${longitude}/${userTelephone}`);
                navigate(`/auth/register/${pharmacy.tel}/${pharmacy.email.replaceAll(`.`, `,`)}`);


                console.log("Data sucessfuly submitted");

                const data: WebAppData = {
                    message: 'Votre pharmacie a été bien enregistrer dans notre système ! ',
                    email: pharmacy.email,
                    tel: formatPhoneNumber(userTelephone!),
                    hasEmail: hasEmail,
                    step: WebAppDataStep.CREATE_ACOUNT
                }
                tele.sendData(JSON.stringify(data));

            })
            .catch((error) => {
                console.log("Error adding document:", error);
            });
    }

    const checkExistPharmacy = async (pharmacy: Pharmacy) => {
        setIsLoading(false);

        const qName = query(collection(db, "pharmacies"),
            where("name", "==", pharmacy.name)
        );
        const docsName = await getDocs(qName);
        if (docsName.docs.length > 0) {
            const errorMsg = `Pharmacy with name ${pharmacy.name} already exist !`;
            setNameErrorMsg(errorMsg)
            throw new Error(errorMsg);
        }


        const qTel = query(collection(db, "pharmacies"),
            where("tel", "==", pharmacy.tel),
        );
        const docsTel = await getDocs(qTel);
        if (docsTel.docs.length > 0) {
            const errorMsg = `Pharmacy with tel ${pharmacy.tel} already exist !`
            setTelErrorMsg(errorMsg);
            throw new Error(errorMsg);
        }


        const qEmail = query(collection(db, "pharmacies"),
            where("email", "==", pharmacy.email),
        );
        const docsEmail = await getDocs(qEmail);
        if (docsEmail.docs.length > 0) {
            const errorMsg = `Pharmacy with email ${pharmacy.email} already exist !`;
            setEmailErrorMsg(errorMsg);
            throw new Error(errorMsg);
        }

        
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

                    <div className="mainCard">
                      
                        {
                            telErrorMsg && <small className="text-red-500 hover:text-red-600" > {telErrorMsg} </small>
                        }
                        <br />
                        {
                            emailErrorMsg && <small className="text-red-500 hover:text-red-600" > {emailErrorMsg} </small>
                        }
                        <br />
                        {
                            nameErrorMsg && <small className="text-red-500 hover:text-red-600" > {nameErrorMsg} </small>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}