import { useContext } from "react";
import { UserContext } from "../../utils/PrivateRoutes";


import DutyDrugstore from './dutyDrugstore';
import Unauthorized from "../Unauthorized";




const DutyDrugstorePage = () => {

    const connectedUser = useContext(UserContext);

    return (
        <>
            {
                connectedUser?.roles!.includes('admin') ? <DutyDrugstore />  : <Unauthorized />
            }           
        </>
    )
}
export default DutyDrugstorePage