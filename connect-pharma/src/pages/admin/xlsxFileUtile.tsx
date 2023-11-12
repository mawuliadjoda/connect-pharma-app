
import { read, utils, writeFile } from 'xlsx';
import { useState } from "react";
import { DutyPharmacy } from './DutyPharmacy';
import { Timestamp, doc, writeBatch } from '@firebase/firestore';
import { db } from '../../services/db';


// https://www.ultimateakash.com/blog-details/Ii0zOGAKYAo=/How-to-Import-Export-Excel-&-CSV-In-React-2022
const XlsxFileUtile = () => {


    const [dutyDrugstores, setDutyDrugstores] = useState<DutyPharmacy[]>([]);

    const handleImport = ($event: any) => {
        const files = $event.target.files;

        if (files!.length) {
            const file = files![0];

            const fileName = file.name;

            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event!.target!.result);
                const sheets = wb.SheetNames;


                if (sheets.length) {
                    const rows = utils.sheet_to_json<DutyPharmacy>(wb.Sheets[sheets[0]]);
                    setDutyDrugstores(rows);

                    const [dutyStartDate, dutyEndDate] = getDutyDateFromFileName(fileName.replace('.xlsx', ''));
                    rows.map(dutyDrugstore => {
                        dutyDrugstore.dutyStartDate = Timestamp.fromDate(dutyStartDate);
                        dutyDrugstore.dutyEndDate = Timestamp.fromDate(dutyEndDate);
                    })
                    console.log(rows);

                    // https://firebase.google.com/docs/firestore/manage-data/transactions?hl=fr
                    const batch = writeBatch(db);
                    rows.forEach((row, index) => {
                        const tel = `${import.meta.env.VITE_APP_TOGO_COUNTRY_CODE}${row.TELEPHONES.replaceAll(' ', '')}`;
                        row.TELEPHONES = tel;

                        const rowRef = doc(db, "dutyPharmacies",  `${tel}_${index}`); //automatically generate unique id
                        batch.set(rowRef, row);
                    });
                    // await batch.commit();

                    batch
                        .commit()
                        .then(() => {
                            console.log("Batch write operation completed");
                        })
                        .catch((error) => {
                            console.error("Batch write operation failed: ", error);
                        });
                }
            }
            reader.readAsArrayBuffer(file);


        }
    }

    const getDutyDateFromFileName = (fileName: string) => {

        const datePart = fileName?.split('-');
        const dayPart = datePart[0]?.split('_');

        const dutyStartDate = new Date(+datePart[2], +datePart[1] - 1, +dayPart[0], 0, 0, 0);
        const dutyEndDate = new Date(+datePart[2], +datePart[1] - 1, +dayPart[1], 23, 59, 59);

        return [dutyStartDate, dutyEndDate];

    }
    const handleExport = () => {
        const headings = [[
            'PHARMACIES',
            'TELEPHONES',
            'EMPLACEMENTS'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, dutyDrugstores, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Movie Report.xlsx');
    }


    return (
        <>

            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                    <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button onClick={handleExport} className="btn btn-primary float-right">
                                Export <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <br />
            <hr />

            <div className="row">
                <div className="col-sm-6 offset-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">PHARMACIES</th>
                                <th scope="col">TELEPHONES</th>
                                <th scope="col">EMPLACEMENTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dutyDrugstores.length
                                    ?
                                    dutyDrugstores.map((dutyDrugstores: any, index: number) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{dutyDrugstores.PHARMACIES}</td>
                                            <td>{dutyDrugstores.TELEPHONES}</td>
                                            <td>{dutyDrugstores.EMPLACEMENTS}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={5} className="text-center">No Movies Found.</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
export default XlsxFileUtile