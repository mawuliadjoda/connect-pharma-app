import { Pharmacy } from "./Pharmacy"
import Datatables from "../../components/Datatables/Table";
import TableCell from "../../components/Datatables/TableCell";
import { Link } from "react-router-dom";
import  "./PharmacyTable.css";

type PharmacyTableProps = {
    loading: boolean,
    dataHeader: { key: string; label: string; }[],
    data: Pharmacy[],
    isClient?: boolean,
    openWhatsapp?: (pharmacy: Pharmacy) => void,
    openTelegram?: (pharmacy: Pharmacy) => void,
    openMag?:(pharmacy: Pharmacy) => void
}



// https://fontawesomeicons.com/whatsapp
export default function PharmacyTable({ loading, dataHeader, data, openWhatsapp, openTelegram, openMag, isClient }: PharmacyTableProps) {

    return (
        <>
            <div>
                <Datatables loading={loading} dataHeader={dataHeader}>
                    {data?.map((row: Pharmacy, index: number) => (
                        <tr
                            key={index}
                            className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
                        >
                            <TableCell dataLabel="Nom" showLabel={true}>
                                <span className="font-medium text-sm text-gray-900">
                                    {row.name}
                                </span>
                            </TableCell>

                            {
                                !isClient &&
                                <TableCell dataLabel="Tel" showLabel={true}>
                                     <p className="font-normal text-sm text-gray-500">{row.tel}</p>
                                </TableCell>
                            }
                            
                            {
                                !isClient && 
                                <TableCell dataLabel="Email" showLabel={true}>
                                     <p className="font-normal text-sm text-gray-500">{row.email}</p>
                                </TableCell>
                            }                           

                            {
                                isClient &&
                                <TableCell dataLabel="distance" showLabel={isClient}>
                                    <p className="font-normal text-sm text-gray-500">{row.distanceStr}</p>
                                </TableCell>
                            }

                            {
                                !isClient &&
                                <>
                                    <TableCell dataLabel="Lat" showLabel={true}>
                                        <p className="font-normal text-sm text-gray-500">{row.location.latitude}</p>
                                    </TableCell>

                                    <TableCell dataLabel="Lng" showLabel={true}>
                                        <p className="font-normal text-sm text-gray-500">{row.location.longitude}</p>
                                    </TableCell>
                                </>
                            }


                            {
                                isClient &&
                                <TableCell showLabel={isClient}>
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openWhatsapp!(row);
                                        }}

                                        to={`/auth/master/user/${row.id}/edit`}
                                        className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm`}
                                    >
                                        {/* <i className="fa fa-whatsapp" aria-hidden="true" /> */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            style={{ color: "#128c7e" }}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                        </svg>

                                    </Link>
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openTelegram!(row);
                                        }}
                                        to={`/auth/master/user/${row.id}/edit`}
                                        className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm ml-10 mr-10`}
                                    >
                                        <i className="fa fa-telegram icon_size" aria-hidden="true" />
                                    </Link>

                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openMag!(row);
                                        }}
                                        to={`/auth/master/user/${row.id}/edit`}
                                        className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm`}
                                    >
                                        {/* <i className="fa fa-map-marker icon_size" aria-hidden="true" /> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                            <path fill="#48b564" d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"></path><path fill="#fcc60e" d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"></path><path fill="#2c85eb" d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"></path><path fill="#ed5748" d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"></path><path fill="#5695f6" d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"></path>
                                        </svg>


                                    </Link>
                                </TableCell>
                            }

                        </tr>
                    ))}
                </Datatables>
            </div>
        </>
    )
}