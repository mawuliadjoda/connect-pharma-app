import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CallFromPageEnum, CallFromValue } from "./UtilEnum";
import { TEInput } from "tw-elements-react";


type HandleWebClientPhoneNumberProps = {
    latitude: number,
    longitude: number,
    callFromPage: CallFromValue,
    candRedirectMessage: string
}
const TEL_PHONE_NUMBER_LENGHT = 11;

const HandleWebClientPhoneNumber = ({ latitude, longitude, callFromPage, candRedirectMessage }: HandleWebClientPhoneNumberProps) => {
    const telRef = useRef<HTMLInputElement>(null);
    const [candRedirect, setCandRedirect] = useState<boolean>(false);

    // function handleSubmit(e: FormEvent) {
    //     e.preventDefault();

    //     onSubmit(telRef.current!.value);
    // }

    const handleInputChange = (e: FormEvent) => {
        e.preventDefault();

        console.log(latitude);
        console.log(longitude);
        console.log(telRef.current!.value);

        setCandRedirect(false);
        if (telRef.current!.value.length === TEL_PHONE_NUMBER_LENGHT || telRef.current!.value.length === TEL_PHONE_NUMBER_LENGHT + 1) {
            setCandRedirect(true);
        }

    };

    return (
        <>
            <main className="h-full shadow">
                {
                    latitude && longitude &&
                    <div className="mainCard">
                      
                        <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                            <form>

                                {/* className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700" */}
                                <div >

                                    {/* <label htmlFor="tel" className="text-sm text-gray-600">
                                <span>Tél</span>
                            </label>
                            <input
                                id="tel"
                                type="text"
                                name="tel"
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="228 suivi de votre numéro"
                                ref={telRef}

                                onChange={handleInputChange}
                                required

                            /> */}

                                    <TEInput

                                        type="number"
                                        label="Saisir votre numéro de tél"

                                        ref={telRef}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <small
                                            id="telHelp"
                                            className="absolute w-full text-neutral-500 dark:text-neutral-200"
                                        >
                                            <span>Votre numéro est nécessaire afin de vous mettre en contact avec les pharmacies <br /> Nous gardons la confidentialité de votre numéro</span>
                                            {/* Nous gardons la confidentialité de votre numéro */}
                                        </small>
                                    </TEInput>
                                </div>


                                <br />
                                <br />
                                <br />

                                {
                                    candRedirect &&
                                    <Link
                                        className="btn btn-primary"
                                        to={{
                                            pathname: `${callFromPage === CallFromPageEnum.NearestPharmaciesPage ? CallFromPageEnum.NearestPharmaciesPage : CallFromPageEnum.AddPharmacy}/${latitude}/${longitude}/${telRef.current!.value}`,
                                            // state
                                        }}
                                    >
                                        <div className="mt-6 flex flex-row gap-4">
                                            <button
                                                className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
                                                {candRedirectMessage}
                                            </button>
                                        </div>
                                    </Link>
                                }
                            </form>
                        </div>
                    </div>
                }
            </main>

        </>
    )
}
export default HandleWebClientPhoneNumber;