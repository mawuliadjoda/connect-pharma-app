import { Pharmacy } from "./Pharmacy"
import Datatables from "../../components/Datatables/Table";
import TableCell from "../../components/Datatables/TableCell";
import { Link } from "react-router-dom";

type PharmacyTableProps = {
    loading: boolean,
    dataHeader: any,
    data: Pharmacy[],
    showDistance?: boolean,
    openWhatsapp?: (tel: string) => void,
    openTelegram?: (tel: string) => void
}


/*
const iconPropTelegram: IconProp = {iconName:'telegram', prefix: 'fab'};

const telegramIcon: FontAwesomeIconProps = {
    icon: iconPropTelegram
}
*/

// https://fontawesomeicons.com/whatsapp
export default function PharmacyTable({ loading, dataHeader, data, openWhatsapp, openTelegram, showDistance }: PharmacyTableProps) {

    console.log(showDistance);

    return (
        <>
            <div>
                <Datatables loading={loading} dataHeader={dataHeader}>
                    {data?.map((row: any, index: any) => (
                        <tr
                            key={index}
                            className="bg-white border md:border-b block md:table-row rounded-md shadow-md md:rounded-none md:shadow-none mb-5"
                        >
                            <TableCell dataLabel="Name" showLabel={true}>
                                <span className="font-medium text-sm text-gray-900">
                                    {row.name}
                                </span>
                            </TableCell>

                            <TableCell dataLabel="Tel" showLabel={true}>
                                <p className="font-normal text-sm text-gray-500">{row.tel}</p>
                            </TableCell>

                            <TableCell dataLabel="Email" showLabel={true}>
                                <p className="font-normal text-sm text-gray-500">{row.email}</p>
                            </TableCell>

                            {
                                showDistance &&
                                <TableCell dataLabel="distance" showLabel={showDistance}>
                                    <p className="font-normal text-sm text-gray-500">{row.distanceStr} km</p>
                                </TableCell>
                            }

                            {
                                !showDistance &&
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
                                showDistance &&
                                <TableCell showLabel={showDistance}>
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openWhatsapp!(row.tel);
                                        }}

                                        to={`/auth/master/user/${row.id}/edit`}
                                        className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm`}
                                    >
                                        <i className="fa fa-whatsapp" aria-hidden="true"></i>

                                    </Link>
                                    <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openTelegram!(row.tel);
                                        }}
                                        to={`/auth/master/user/${row.id}/edit`}
                                        className={`text-sky-700 inline-flex py-2 px-2 rounded  text-sm`}
                                    >
                                        <i className="fa fa-telegram" aria-hidden="true"></i>
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