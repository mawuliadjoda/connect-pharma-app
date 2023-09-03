import { faLeaf, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import initMenus from "../../data/menus.ts";
import "./sidebar.css";
import SidebarLogo from "./SidebarLogo.jsx";
import SidebarSearch from "./SidebarSearch.tsx";
import MenuList from "./MenuList.tsx";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../services/db.tsx";

function Sidebar({ ...props }) {
  const navigate = useNavigate();
  const [menus, setMenus] = useState(initMenus);
  const [scButton, setScButton] = useState(false);
  const search = useRef("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setScButton(true);
      setMenus(
        menus.filter((el) => {
          return el.label.toLowerCase().includes(e.target.value.toLowerCase());
        })
      );
    } else {
      setScButton(false);
      setMenus(initMenus);
    }
  };

  const clearSearch = () => {
    // search.current.value = "";
    setMenus(initMenus);
    setScButton(false);
  };

  const logout = () => {
    onLogout();
    navigate("/auth/login");
  };



  return (
    <>
      <aside
        id="sidebar"
        className={`sidebarWrapper md:translate-x-0 -translate-x-full md:z-0 z-50 no-scrollbar ${props.className}`}
      >
        {/* Sidebar wrapper */}
        <div className="md:w-64 border-r-2 border-gray-100 h-full flex-col flex flex-shrink-0">
          {/* Logo */}
          <SidebarLogo toggle={props.toggle} icon={faLeaf} text={import.meta.env.VITE_SITE_NAME} />

          {/* Search Menu */}
          <SidebarSearch
            clearSearch={clearSearch}
            handleChange={handleChange}
            scButton={scButton}
            search={search}
            className="px-4 w-full py-4 px-2 items-center flex relative"
          />

          {/* Menu */}
          <MenuList menus={menus} toggle={props.toggle} />

          {/* Profile */}
          <div className="pt-2 border-t border-gray-300">
            <div className="py-2 px-4">
              <button
                className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm"
                onClick={() => logout()}
              >
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon> Logout
              </button>
            </div>
          </div>
          
        </div>
      </aside>

      {props.className === "mobile" && (
        <div
          id="overlaySidebar"
          onClick={props.toggle}
          className="hidden absolute w-full h-screen bg-black z-10 inset-0 opacity-60"
        >
          <div></div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
