import Navbar from "../components/Navbar/Index";
import { Link, useOutletContext } from "react-router-dom";

function NotFound() {
  const [sidebarToggle] = useOutletContext<any>();
  return (
    <main className="h-full">
      <Navbar toggle={sidebarToggle} />

      {/* Main Content */}
      <div className="text-center">
        <p className="text-base font-semibold text-gray-900">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/" className="py-2 px-4 border border-emerald-500 bg-emerald-600 rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm" >
            <span aria-hidden="true">&larr;</span> Go back home
          </Link>
          <Link to="/" className="py-2 px-4 border border-emerald-500 bg-emerald-600 rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
