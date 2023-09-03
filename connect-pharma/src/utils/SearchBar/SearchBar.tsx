// import { TERipple } from "tw-elements-react";
import SidebarSearch from "../../components/Sidebar/SidebarSearch";
import { useRef, useState } from "react";


type SearchBarProps = {
    setSearchQuery: (value: string) => void
}

const SearchBar = ({ setSearchQuery }: SearchBarProps) => {
    const [scButton, setScButton] = useState(false);
    const searchQuery = useRef<HTMLInputElement>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setScButton(true);
            setSearchQuery(e.target.value);
        } else {
            setScButton(false);
        }
    };

    const clearSearch = () => {
        if (searchQuery?.current) {
            searchQuery.current.value = "";
        }
        setSearchQuery('');
        setScButton(false);
    };

    return (

        <>
            <SidebarSearch 
                clearSearch={clearSearch}
                handleChange={handleChange}
                scButton={scButton}
                search={searchQuery}
            />

            {/* <div className="mb-3 md:w-96">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-gray-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-emerald-400 focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none placeholder-gray-500 focus:outline-none focus:border-emerald-400 "

                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Rechercher"
                        required
                    />

                    <TERipple color='light'>
                        <button
                            className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full  text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm"
                            type="button"
                            id="button-addon1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                    </TERipple>
                </div>
            </div> */}
        </>

    );
};

export default SearchBar;
