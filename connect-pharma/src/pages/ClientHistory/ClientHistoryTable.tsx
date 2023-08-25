import Datatables from "../../components/Datatables/Table";
import TableCell from "../../components/Datatables/TableCell";
import { Link } from "react-router-dom";
import { ClientHistory } from "./ClientHistory";

type ClientHistoryTableProps = {
    loading: boolean,
    dataHeader: { key: string; label: string; }[],
    data: ClientHistory[],
    openWhatsapp?: (tel: string) => void,
    openTelegram?: (tel: string) => void,
}


export default function ClientHistoryTable({
    loading,
    dataHeader,
    data,
    openWhatsapp,
    openTelegram,
}: ClientHistoryTableProps) {

    return (
        <>
            <div>
                <Datatables loading={loading} dataHeader={dataHeader}>
                    {data?.map((row: ClientHistory, index: number) => (
                        <tr
                            key={index}
                            className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
                        >
                            <TableCell dataLabel="Date" showLabel={true}>
                                <span className="font-medium text-sm text-gray-900">
                                    {row.createTimeFormat}
                                </span>
                            </TableCell>


                            <TableCell dataLabel="Tel" showLabel={true}>
                                <p className="font-normal text-sm text-gray-500">{row.clientPhoneNumber}</p>
                            </TableCell>

                            <TableCell dataLabel="Distance" showLabel={true}>
                                <p className="font-normal text-sm text-gray-500">{row.distanceData?.distanceStr}</p>
                            </TableCell>

                            <TableCell dataLabel="Pharmacie" showLabel={true}>
                                <p className="font-normal text-sm text-gray-500">{row.pharmacyName}</p>
                            </TableCell>

                            <TableCell dataLabel="Action Clik" showLabel={true}>
                                <p className="font-normal text-sm text-gray-500">{row.action}</p>
                            </TableCell>

                            <TableCell showLabel={true}>
                                <Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        openWhatsapp!(row.clientPhoneNumber);
                                    }}

                                    to={`/auth/master/user/${row.id}/edit`}
                                    className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm`}
                                >
                                    <i className="fa fa-whatsapp" aria-hidden="true" />

                                </Link>
                                <Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        openTelegram!(row.clientPhoneNumber);
                                    }}
                                    to={`/auth/master/user/${row.id}/edit`}
                                    className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm ml-10 mr-10`}
                                >
                                    <i className="fa fa-telegram" aria-hidden="true" />
                                </Link>

                            </TableCell>

                        </tr>
                    ))}
                </Datatables>
            </div>
        </>
    )
}