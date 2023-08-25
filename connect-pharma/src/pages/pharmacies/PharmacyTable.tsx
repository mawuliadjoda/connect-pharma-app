import { Pharmacy } from "./Pharmacy"
import Datatables from "../../components/Datatables/Table";
import TableCell from "../../components/Datatables/TableCell";
import { Link } from "react-router-dom";

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
                                        <i className="fa fa-whatsapp" aria-hidden="true" />

                                    </Link>
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openTelegram!(row);
                                        }}
                                        to={`/auth/master/user/${row.id}/edit`}
                                        className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm ml-10 mr-10`}
                                    >
                                        <i className="fa fa-telegram" aria-hidden="true" />
                                    </Link>

                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openMag!(row);
                                        }}
                                        to={`/auth/master/user/${row.id}/edit`}
                                        className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm`}
                                    >
                                        <i className="fa fa-map-marker" aria-hidden="true" />
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