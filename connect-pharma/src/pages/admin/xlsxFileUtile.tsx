
import { read, utils, writeFile } from 'xlsx';
import { useState } from "react";
import { DutyPharmacy } from './DutyPharmacy';
import { Timestamp, WriteBatch, doc, writeBatch } from '@firebase/firestore';
import { db } from '../../services/db';
import { collection, query, where, getDocs } from "firebase/firestore";
import { PharmacyConverter } from '../pharmacies/Pharmacy';


// FileNameFormat = dd-mm-yyyy_dd-mm-yyyy
// https://www.ultimateakash.com/blog-details/Ii0zOGAKYAo=/How-to-Import-Export-Excel-&-CSV-In-React-2022
const XlsxFileUtile = () => {


    const [dutyDrugstores, setDutyDrugstores] = useState<DutyPharmacy[]>([]);

  
    const handleImport =   ($event: any) => {
        const files = $event.target.files;

        if (files!.length) {
            const file = files![0];

            const fileName = file.name;

            const reader = new FileReader();
            reader.onload = async (event) => {
                const wb = read(event!.target!.result);
                const sheets = wb.SheetNames;


                if (sheets.length) {
                    let rows = utils.sheet_to_json<DutyPharmacy>(wb.Sheets[sheets[0]]);
                    setDutyDrugstores(rows);

                    const [dutyStartDate, dutyEndDate] = getDutyDateFromFileName(fileName.replace('.xlsx', ''));
                    rows = updateDutyDrugstore(rows, dutyStartDate, dutyEndDate);
                    
                    const {batchDutyPharmacies, dutyDrugstorePhoneNumbers} = saveDutyDrugstore(rows);                
                    commitBatch(batchDutyPharmacies, 'save duty drogstores');                    
                    
                    /* get all pharmacies and set duty info*/                   
                    updateAllPharmaciesWithDutyInformation(dutyDrugstorePhoneNumbers, dutyStartDate, dutyEndDate);
                    
                }
            }
            reader.readAsArrayBuffer(file);


        }
    }

 
    const updateAllPharmaciesWithDutyInformation = async (dutyDrugstorePhoneNumbers: Set<string>, dutyStartDate: Date, dutyEndDate: Date) => {
        const q = query(collection(db, "pharmacies"), where("name", "!=", null));

      
        const querySnapshot = await getDocs(q);
        
        const batchPharmacies = writeBatch(db);
        querySnapshot.forEach((docPharmacy) => {                      

            const pharmacy = PharmacyConverter.fromFirestore(docPharmacy);
            pharmacy.isDuty = false;
            pharmacy.isOpen = true;         
           
            pharmacy.tel = pharmacy.tel?.replaceAll('+', '').trim();

            delete pharmacy['dutyStartDate'];
            delete pharmacy['dutyEndDate'];

            if(dutyDrugstorePhoneNumbers.has(pharmacy.tel)) {                
                pharmacy.isDuty = true;
                pharmacy.dutyStartDate = Timestamp.fromDate(dutyStartDate);
                pharmacy.dutyEndDate = Timestamp.fromDate(dutyEndDate);
            }   
            
            const pharmacyRef = doc(db, "pharmacies",  docPharmacy.id );
            batchPharmacies.update(pharmacyRef, pharmacy);
            
        });
        // await batchPharmacies.commit();
        commitBatch(batchPharmacies, 'update pharmacies with duty info');
    }
    const saveDutyDrugstore = (rows: DutyPharmacy[]) => {
         // https://firebase.google.com/docs/firestore/manage-data/transactions?hl=fr
         const batchDutyPharmacies = writeBatch(db);
         const dutyDrugstorePhoneNumbers = new Set<string>();
         rows.forEach((row, index) => {
             const tel = `${import.meta.env.VITE_APP_COUNTRY_CODE}${row.TELEPHONES.replaceAll(' ', '')}`;
             row.TELEPHONES = tel;
             dutyDrugstorePhoneNumbers.add(tel);
             const rowRef = doc(db, "dutyPharmacies",  `${tel}_${index}`); //automatically generate unique id
             batchDutyPharmacies.set(rowRef, row);
         });
        return {batchDutyPharmacies, dutyDrugstorePhoneNumbers};
    }

    const commitBatch = (batch: WriteBatch, logMsg?: string) => {
        console.log(logMsg)

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
    const updateDutyDrugstore = (rows: DutyPharmacy[], dutyStartDate: Date, dutyEndDate: Date) => {
       
        rows.map(dutyDrugstore => {
            dutyDrugstore.dutyStartDate = Timestamp.fromDate(dutyStartDate);
            dutyDrugstore.dutyEndDate = Timestamp.fromDate(dutyEndDate);
        })

        return rows;
    }
    const getDutyDateFromFileName = (fileName: string) => {

        const tap = fileName?.split('_');
        const startDatePart = tap[0].split('-');
        const endDatePart = tap[1].split('-');

        const dutyStartDate = new Date(+startDatePart[2], +startDatePart[1] - 1, +startDatePart[0], 0, 0, 1);
        const dutyEndDate = new Date(+endDatePart[2], +endDatePart[1] - 1, +endDatePart[0], 23, 59, 59);

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
        writeFile(wb, 'Duty Report.xlsx');
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
                                        <td colSpan={5} className="text-center">No Drugstore Found.</td>
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