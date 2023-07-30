import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faNotdef
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../components/Sidebar/MenuList";

const initMenu: Menu[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },
  {
    label: "Blank",
    path: "/blank",
    icon: faPage4,
  },
  {
    label: "404",
    path: "/404",
    icon: faNotdef,
  },
  {
    label: "Form",
    path: "/form",
    icon: faWindows,
  },
  {
    label: "Tabel",
    path: "/table",
    icon: faTable,
  },
  {
    label: "Login",
    path: "/auth/login",
    icon: faLock,
  },
  {
    label: "Register",
    path: "/auth/register",
    icon: faNoteSticky,
  },
];

export default initMenu