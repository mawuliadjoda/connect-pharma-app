import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading/Loading";
import NearestPharmaciesPage from "./NearestPharmaciesPage";


const ADVICE_MESSAGE = "Votre localisation est nécéssaire pour afficher les pharmacies proches ! Merci d'autoriser l'application !"

const NearestPharmaciesHomePage = () => {

    const [time, setTime] = useState(0);
    const [isCounting, setIsCounting] = useState<boolean>(false);



    useEffect(() => {
        
        const locationAuthorized = localStorage.getItem("LocationAuthorized");
        const foundLocationAuthorized = locationAuthorized ? JSON.parse(locationAuthorized) : null;

        if (!foundLocationAuthorized?.isLocationAuthorized) {

            let seconds = 5;
            setTime(seconds);
            const makeIteration = () => {
                console.clear();
                if (seconds > 0) {
                    console.log(seconds);
                    seconds -= 1;
                    setTime(seconds);
                    setTimeout(makeIteration, 1000);  // 1 second waiting

                    setIsCounting(true);
                } else {
                    console.log('Done!');
                    setIsCounting(false);

                    //
                }
            };
            setTimeout(makeIteration, 1000);  // 1 second waiting

        }


    }, []);


    return (
        <>
            {
                isCounting
                    ? <Loading message={`___${time}  ___ ${ADVICE_MESSAGE}`} isForClient={true} />
                    : <NearestPharmaciesPage />
            }
        </>
    )
}
export default NearestPharmaciesHomePage