import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type SidebarSearchProps = {
  scButton: boolean,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  clearSearch: () => void,
  search: any,
  className?: string
}
function CustomSearch({ scButton, handleChange, clearSearch, search, className }: SidebarSearchProps) {
  return (
    // className="px-4"
    <div>
      {/* className="w-full mt-1 mb-1 items-center flex relative" */}
      <div className={className ? className : "w-full mt-1 mb-1 items-center flex relative"}>
        <input
          type="text"
          name=""
          placeholder=""
          id=""
          onChange={handleChange}
          ref={search}
          className="border rounded-full text-sm w-full px-3 py-2 focus:outline-none focus:border-green-300 bg-slate-50"
        />

        {!scButton && (
          <FontAwesomeIcon
            className="absolute right-6 text-slate-500"
            icon={faMagnifyingGlass}
          ></FontAwesomeIcon>
        )}

        {scButton && (
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute right-6 cursor-pointer text-slate-500"
            onClick={clearSearch}
          ></FontAwesomeIcon>
        )}
      </div>
    </div>
  );
}

export default CustomSearch;
