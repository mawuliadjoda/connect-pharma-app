import { FormEvent, useRef } from "react";
import { Pharmacy } from "./Pharmacy"


type PharmacyFormProps = {
    onSubmit: (pharmacyData: Pharmacy) => void,
    initialPharmacyData: Pharmacy
}


export default function PharmacyForm({ onSubmit, initialPharmacyData }: PharmacyFormProps) {

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const telRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onSubmit({

            address: addressRef.current!.value,
            email: emailRef.current!.value,
            isActive: false,
            location: initialPharmacyData.location,
            name: nameRef.current!.value,
            tel: telRef.current!.value,

        });
    }
    return (
        <>
            <div className="mainCard">
                <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="name" className="text-sm text-gray-600">
                                Nom
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="Nom de la pharmacie"
                                ref={nameRef}
                                required
                                defaultValue={initialPharmacyData.name}

                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="text-sm text-gray-600">
                                Adresse
                            </label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="Adresse"
                                ref={addressRef}
                                required
                                defaultValue={initialPharmacyData.address}

                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm text-gray-600">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="email"
                                ref={emailRef}
                                required
                                defaultValue={initialPharmacyData.email}

                            />
                        </div>

                        <div>
                            <label htmlFor="tel" className="text-sm text-gray-600">
                                Tel
                            </label>
                            <input
                                id="tel"
                                type="text"
                                name="tel"
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="Tel"
                                ref={telRef}
                                required
                                defaultValue={initialPharmacyData.tel}

                            />
                        </div>

                        <div className="mt-6 flex flex-row gap-4">
                            <button className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}