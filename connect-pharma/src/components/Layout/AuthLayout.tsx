import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { sidebarToggle } from "../../utils/toggler.ts";
import BottomNavbar from "../BottomNavbar/Index.tsx";

function AuthLayout() {
  const isDesktop = () => document.body.clientWidth > 768;
  const [sidebarStatus, setSidebarStatus] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSidebarStatus(isDesktop());
    });
    return () => window.removeEventListener("resize", isDesktop);
  }, []);

  return (
    <div className="adminLayout">
      {/* Sidebar */}
      <Sidebar
        toggle={sidebarToggle}
        className={sidebarStatus ? "" : "mobile"}
      />

      {/* Main Wrapper */}
      <div className="mainWrapper">
        <Outlet context={[sidebarToggle]} />
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}

export default AuthLayout;
