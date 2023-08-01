import { Pharmacy } from "./Pharmacy"
import Datatables from "../../components/Datatables/Table";
import TableCell from "../../components/Datatables/TableCell";

type PharmacyTableProps = {
    loading: boolean,
    dataHeader: any,
    data: Pharmacy[],
    showDistance?: boolean
}

export default function PharmacyTable({ loading, dataHeader, data, showDistance = false }: PharmacyTableProps) {


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

                            <TableCell dataLabel="distance" showLabel={showDistance}>
                                <p className="font-normal text-sm text-gray-500">{row.distanceStr} km</p>
                            </TableCell>

                            <TableCell dataLabel="Lat" showLabel={true}>
                                <p className="font-normal text-sm text-gray-500">{row.location.latitude}</p>
                            </TableCell>

                            <TableCell dataLabel="Lng" showLabel={true}>
                                <p className="font-normal text-sm text-gray-500">{row.location.longitude}</p>
                            </TableCell>
                        </tr>
                    ))}
                </Datatables>
            </div>
        </>
    )
}