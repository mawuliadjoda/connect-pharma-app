import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type MenuListProps = {
  toggle: () => void,
  menus: Menu[]
}

export type Menu = {
  label: string,
  path: string,
  icon: IconDefinition | any,
  submenu?: Submenu [],
  role?: any
}
export type Submenu = {
  label: string,
  path: string,
}
function MenuList({ menus, toggle }: MenuListProps) {
  return (
    <div className="navWrapper p-4">
      <ul id="menu" className="">
        {menus?.map((menu) =>
          menu.submenu ? (
            <SubMenu key={menu.label} menu={menu} toggle={toggle} />
          ) : menu.path ? (
            <li key={menu.label} className={``} onClick={toggle}>
              <NavLink to={`${menu.path}`} className="link">
                {menu.icon && <FontAwesomeIcon icon={menu.icon} />}
                {menu.label}
              </NavLink>
            </li>
          ) : (
            <li key={menu.label} className="mt-5 mb-3">
              <span className="text-gray-500 font-medium uppercase text-xs mx-2">
                {menu.label} {menu.role}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default MenuList;
