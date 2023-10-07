import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import NearestPharmacies from "./NearestPharmacies";
import { convertToENecimal } from "../../../utils/Utils";
import HandleWebClientPhoneNumber from "../HandleWebClientPhoneNumber/HandleWebClientPhoneNumber";
import { CallFromPageEnum, CandRedirectMessageEnum } from "../HandleWebClientPhoneNumber/UtilEnum";



const NearestPharmaciesPage = () => {
    const { latitude, longitude, userTelephone } = useParams();
    const [isGeoLocationError, setIsGeoLocationError] = useState(false);

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

                    setIsGeoLocationError(false);

                },
                (error) => {
                    console.error(error);
                    // alert(error);
                    setIsGeoLocationError(true);
                }
            );
        } else {
            console.log('latitude && longitude && userTelephone probably passed to browser.');
            setIsGeoLocationError(false);
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

            {
                isGeoLocationError &&

                <div className="">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <small className="absolute w-full text-neutral-500 dark:text-neutral-200 mr-5">
                        <span>La géolocation est décactivée sur votre téléphone ! <br />
                            Veuillez activer la geolocation dans les paramètre de votre téléphone puis actualiser la page
                            pour voir les pharmacies connectées auprès de vous ! <br />
                            Nous gardons votre confidentialité !
                        </span>
                    </small>
                </div>

            }
        </>
    );
}
export default NearestPharmaciesPage;