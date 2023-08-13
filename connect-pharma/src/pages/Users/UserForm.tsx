
import { FormEvent, useRef } from 'react';
import { User } from './User';

type UserFormProps = {
    onSubmit: (userData: User) => void,
    initialUserData: User,
    isLoading?: boolean
}

function UserForm({ onSubmit, initialUserData, isLoading }: UserFormProps) {

    const nameRef = useRef<HTMLInputElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onSubmit({
            name: nameRef.current!.value,
            username: userNameRef.current!.value,
            email: emailRef.current!.value,
            roles: initialUserData!.roles
        });
    }

    return (
        <>
            <div className="mainCard">
                <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="name" className="text-sm text-gray-600">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="Name"
                                ref={nameRef}
                                required
                                defaultValue={initialUserData!.name}

                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="text-sm text-gray-600">
                                User name
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                className="text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="username"
                                ref={userNameRef}
                                required
                                defaultValue={initialUserData!.username}

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
                                defaultValue={initialUserData!.email}

                            />
                        </div>

                        <div className="mt-6 flex flex-row gap-4">
                            <button 
                                disabled={isLoading}
                                className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
                                {isLoading ? 'Loading ...' : 'Enregistrer'} 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserForm