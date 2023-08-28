
import { useEffect } from 'react';
import { getPharmacyData } from '../../../services/FileService';
import { Pharmacy } from '../Pharmacy';
import { GeoPoint, addDoc, collection } from 'firebase/firestore';
import { getDb } from '../../../services/db';

export default function PopulatePharmacies() {

    useEffect(() => {

        // get pharmacies from json      
        const data = getPharmacyData();
        const pharmacyData: Pharmacy[] = data.map(item => {
            const pharmacy: Pharmacy = {

                address: item.adresse,
                email: item.email,
                isActive: item.visible,
                location: new GeoPoint(item.lat, item.lng),
                name: item.label,
                tel: item.tel
            }
            return pharmacy;
        })


        console.log(pharmacyData);


        /* populate pharmacies  */
        const usersRef = collection(getDb(), 'pharmacies');
        pharmacyData.map(pharmacy => {
            if (pharmacy.tel) {
                addDoc(usersRef, pharmacy)
                    .then(() => {
                        console.log("Data sucessfuly submitted");                        
                    })
                    .catch((error) => {
                        console.log("Error adding document:", error);
                    });
            }
        });

    }, []);



    return (
        <>
            <main className="h-full">
            <p> Hi I'm populating phamacies ! </p>
            </main>

        </>
    )
}