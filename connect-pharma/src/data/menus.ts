// import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  // faLock,
  // faNoteSticky,
  // faNotdef
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../components/Sidebar/MenuList";

const initMenu: Menu[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
    role: ['admin']
  },
  {
    label: "Users List",
    path: "/userList",
    icon: faTable,
    role: ['admin']
  },

  {
    label: "Pharmacy List",
    path: "/pharmacies",
    icon: faTable,
    role: ['admin', 'user'],
  },

  {
    label: "Mes clients en ligne",
    path: "/onlineClients",
    icon: faTable,
    role: ['user'],
  },

  {
    label: "Tous les clients en ligne",
    path: "/allOnlineClients",
    icon: faTable,
    role: ['admin', 'user'],
  },
  {
    label: "Mes statistique",
    path: "/statistique",
    icon: faTable,
    role: ['admin', 'user'],
  },
  /*
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
    label: "Login",
    path: "/auth/login",
    icon: faLock,
  },
  {
    label: "Register",
    path: "/auth/register",
    icon: faNoteSticky,
  },
  */
];

export default initMenu