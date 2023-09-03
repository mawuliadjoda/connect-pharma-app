import CustomSearch from "./CustomSearch";
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
            <CustomSearch
                clearSearch={clearSearch}
                handleChange={handleChange}
                scButton={scButton}
                search={searchQuery}
            />
        </>

    );
};

export default SearchBar;
