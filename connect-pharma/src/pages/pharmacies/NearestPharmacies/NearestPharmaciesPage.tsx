import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import NearestPharmacies from "./NearestPharmacies";
import { convertToENecimal } from "../../../utils/Utils";
import HandleWebClientPhoneNumber from "../HandleWebClientPhoneNumber/HandleWebClientPhoneNumber";
import { CallFromPageEnum, CandRedirectMessageEnum } from "../HandleWebClientPhoneNumber/UtilEnum";



const NearestPharmaciesPage = () => {
    const { latitude, longitude, userTelephone } = useParams();

    const [latitudeWeb, setLatitudeWeb] = useState<number | null>(null);
    const [longitudeWeb, setLongitudeWeb] = useState<number | null>(null);

    const latitudeNumber: number | null = useMemo(() => {
        return latitude ? convertToENecimal(latitude) : null;
    }, [latitude]);

    const longitudeNumber: number | null = useMemo(() => {
        return longitude ? convertToENecimal(longitude) : null;
    }, [longitude]);



    useEffect(() => {

        if (!(latitude && longitude && userTelephone) && navigator.geolocation) {
            console.log('latitude && longitude && userTelephone get from browser.');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('get user position from browser autorization !');
                    setLatitudeWeb(position.coords.latitude);
                    setLongitudeWeb(position.coords.longitude);

                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);

                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.log('latitude && longitude && userTelephone probably passed to browser.');
        }

        /*
        if (!(latitude && longitude && userTelephone)) {

            getUserLocationFromBrowser.then((userLocation: UserGeolocationCoordinates) => {

                setLatitudeWeb(userLocation!.latitude);
                setLongitudeWeb(userLocation!.longitude);

                console.log(userLocation?.latitude);
                console.log(userLocation?.longitude);

            }).catch(error => {
                console.error(error);
            })

        } else {
            console.log('latitude && longitude && userTelephone probably passed to browser.');
        }
        */


    }, []);

    return (
        <>
            {
                (latitude && longitude && userTelephone)
                    ?
                    <NearestPharmacies
                        latitude={latitudeNumber!}
                        longitude={longitudeNumber!}
                        userTelephone={userTelephone!}
                    />
                    :
                    <HandleWebClientPhoneNumber
                        latitude={latitudeWeb!}
                        longitude={longitudeWeb!}
                        callFromPage={CallFromPageEnum.NearestPharmaciesPage}
                        candRedirectMessage={CandRedirectMessageEnum.FromNearestPharmaciesPage}
                    />

            }
        </>
    );
}
export default NearestPharmaciesPage;