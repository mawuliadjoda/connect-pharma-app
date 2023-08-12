import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/db";
import { FormEvent, useRef, useState } from "react";

// https://www.youtube.com/watch?v=saaC1hgGnpQ
export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()


        setIsLoading(true);
        sendPasswordResetEmail(auth, emailRef.current!.value).then(() => {
            alert("Check your gmail")

            setIsLoading(false);
            history("/")
        }).catch(err => {
            alert(err.code)
        })
    }


    return (
        <main className="h-full">
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
                                placeholder="@email"
                                ref={emailRef}
                                required

                            />
                        </div>

                        <div className="mt-6 flex flex-row gap-4">
                            <button
                                disabled={isLoading}
                                className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                                {isLoading ? 'Loading ...' : 'Reset'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    )

}