import { useOutletContext } from "react-router";
import Navbar from "../../components/Navbar/Index";

import XlsxFileUtile from "./xlsxFileUtile";


const DutyDrugstore = () => {

    const [sidebarToggle] = useOutletContext<any>();


    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />

                <div className="mainCard">
                    <button className="py-2 px-4 border border-emerald-500 bg-emerald-600 w-full rounded-full text-gray-200 hover:bg-emerald-600 hover:border-emerald-600 justify-end text-sm">
                        Pharmacies de garde
                    </button>

                    <form>
                        <div className="relative">

                            <input
                                // value={searchQuery}
                                // onChange={e => setSearchQuery(e.target.value)}
                                type="search"
                                id="default-search"
                                className="mb-2 mt-2 text-sm placeholder-gray-500 px-4 rounded-lg border border-gray-200 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400 mt-1"
                                placeholder="Search"
                                required />
                        </div>
                    </form>

                    <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                        <XlsxFileUtile />
                    </div>
                </div>
                
            </main>
        </>
    )
}
export default DutyDrugstore