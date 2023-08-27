import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";


type HandleWebClientPhoneNumberProps = {
    latitude: number
    longitude: number
}

const HandleWebClientPhoneNumber = ({ latitude, longitude }: HandleWebClientPhoneNumberProps) => {
    const telRef = useRef<HTMLInputElement>(null);
    const [showPharmacies, setShowPharmacies] = useState<boolean>(false);

    // function handleSubmit(e: FormEvent) {
    //     e.preventDefault();

    //     onSubmit(telRef.current!.value);
    // }

    const handleInputChange = (e: FormEvent) => {
        e.preventDefault();

        console.log(latitude);
        console.log(longitude);
        console.log(telRef.current!.value);

        setShowPharmacies(false);
        if (telRef.current!.value.length === 11) {
            setShowPharmacies(true);
        }

    };

    return (
        <>
            {
                latitude && longitude && 
                <div className="mainCard">
                <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                    <form>
                        <div>
                            <label htmlFor="tel" className="text-sm text-gray-600">
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

                            />
                        </div>

                        {
                            showPharmacies &&
                            <Link
                                className="btn btn-primary"
                                to={{
                                    pathname: `/nearestPharmacies/${latitude}/${longitude}/${telRef.current!.value}`,
                                    // state
                                }}
                            >
                                <div className="mt-6 flex flex-row gap-4">
                                    <button
                                        className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                                        Voir les pharmacies proches
                                    </button>
                                </div>
                            </Link>
                        }
                    </form>
                </div>
            </div>
            }
        </>
    )
}
export default HandleWebClientPhoneNumber;